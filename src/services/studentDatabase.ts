import { StudentFace } from './faceApiService';

class StudentDatabase {
  private dbName = 'AsistoYaDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create students store
        if (!db.objectStoreNames.contains('students')) {
          const studentStore = db.createObjectStore('students', { keyPath: 'id' });
          studentStore.createIndex('name', 'name', { unique: false });
          studentStore.createIndex('createdAt', 'createdAt', { unique: false });
          studentStore.createIndex('lastSeen', 'lastSeen', { unique: false });
        }

        // Create attendance store
        if (!db.objectStoreNames.contains('attendance')) {
          const attendanceStore = db.createObjectStore('attendance', { keyPath: 'id', autoIncrement: true });
          attendanceStore.createIndex('studentId', 'studentId', { unique: false });
          attendanceStore.createIndex('timestamp', 'timestamp', { unique: false });
          attendanceStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }
  async addStudent(name: string, descriptor: Float32Array): Promise<StudentFace> {
    if (!this.db) await this.init();

    const studentCode = this.generateStudentCode(name);
    const student: StudentFace = {
      id: this.generateId(),
      name: name.trim(),
      descriptor,
      createdAt: new Date(),
      // Agregar el código del estudiante como metadata adicional
      code: studentCode
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readwrite');
      const store = transaction.objectStore('students');
      const request = store.add(student);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        console.log(`Estudiante registrado: ${student.name} con código ${studentCode}`);
        resolve(student);
      };
    });
  }

  async getAllStudents(): Promise<StudentFace[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readonly');
      const store = transaction.objectStore('students');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const students = request.result.map((student: any) => ({
          ...student,
          descriptor: new Float32Array(student.descriptor),
          createdAt: new Date(student.createdAt),
          lastSeen: student.lastSeen ? new Date(student.lastSeen) : undefined
        }));
        resolve(students);
      };
    });
  }

  async getStudent(id: string): Promise<StudentFace | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readonly');
      const store = transaction.objectStore('students');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const student = request.result;
        if (student) {
          resolve({
            ...student,
            descriptor: new Float32Array(student.descriptor),
            createdAt: new Date(student.createdAt),
            lastSeen: student.lastSeen ? new Date(student.lastSeen) : undefined
          });
        } else {
          resolve(null);
        }
      };
    });
  }

  async updateStudent(student: StudentFace): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readwrite');
      const store = transaction.objectStore('students');
      const request = store.put(student);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteStudent(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readwrite');
      const store = transaction.objectStore('students');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async recordAttendance(studentId: string, confidence: number): Promise<void> {
    if (!this.db) await this.init();

    const now = new Date();
    const attendance = {
      studentId,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0], // YYYY-MM-DD format
      confidence,
      type: 'facial_recognition'
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['attendance'], 'readwrite');
      const store = transaction.objectStore('attendance');
      const request = store.add(attendance);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateLastSeen(studentId: string): Promise<void> {
    const student = await this.getStudent(studentId);
    if (student) {
      student.lastSeen = new Date();
      await this.updateStudent(student);
    }
  }

  async getAttendanceByDate(date: string): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['attendance'], 'readonly');
      const store = transaction.objectStore('attendance');
      const index = store.index('date');
      const request = index.getAll(date);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAttendanceByStudent(studentId: string): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['attendance'], 'readonly');
      const store = transaction.objectStore('attendance');
      const index = store.index('studentId');
      const request = index.getAll(studentId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async exportData(): Promise<{ students: StudentFace[]; attendance: any[] }> {
    const students = await this.getAllStudents();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['attendance'], 'readonly');
      const store = transaction.objectStore('attendance');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve({
          students,
          attendance: request.result
        });
      };
    });
  }

  async importData(data: { students: StudentFace[]; attendance: any[] }): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['students', 'attendance'], 'readwrite');
    const studentStore = transaction.objectStore('students');
    const attendanceStore = transaction.objectStore('attendance');

    // Clear existing data
    await new Promise<void>((resolve, reject) => {
      const clearStudents = studentStore.clear();
      clearStudents.onerror = () => reject(clearStudents.error);
      clearStudents.onsuccess = () => resolve();
    });

    await new Promise<void>((resolve, reject) => {
      const clearAttendance = attendanceStore.clear();
      clearAttendance.onerror = () => reject(clearAttendance.error);
      clearAttendance.onsuccess = () => resolve();
    });

    // Import students
    for (const student of data.students) {
      await new Promise<void>((resolve, reject) => {
        const request = studentStore.add(student);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    }

    // Import attendance
    for (const record of data.attendance) {
      await new Promise<void>((resolve, reject) => {
        const request = attendanceStore.add(record);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    }
  }
  private generateStudentCode(name: string): string {
    // Extraer las iniciales del nombre completo
    const nameParts = name.trim().split(/\s+/);
    let initials = '';
    
    // Tomar la primera letra de cada palabra del nombre
    for (const part of nameParts) {
      if (part.length > 0) {
        initials += part.charAt(0).toUpperCase();
      }
    }
    
    // Si hay menos de 3 iniciales, completar con las primeras letras del primer nombre
    if (initials.length < 3 && nameParts.length > 0) {
      const firstName = nameParts[0].toUpperCase();
      for (let i = 1; i < firstName.length && initials.length < 3; i++) {
        initials += firstName.charAt(i);
      }
    }
    
    // Asegurar que tengamos al menos 3 caracteres
    if (initials.length < 3) {
      initials = initials.padEnd(3, 'X');
    } else if (initials.length > 3) {
      initials = initials.substring(0, 3);
    }
    
    // Agregar año actual
    const currentYear = new Date().getFullYear();
    
    return `${initials}${currentYear}`;
  }

  private generateId(): string {
    return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async getStudentCount(): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['students'], 'readonly');
      const store = transaction.objectStore('students');
      const request = store.count();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async searchStudents(query: string): Promise<StudentFace[]> {
    const allStudents = await this.getAllStudents();
    const lowercaseQuery = query.toLowerCase();
    
    return allStudents.filter(student => 
      student.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Check if a student has already been recorded today
  async hasAttendanceToday(studentId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = await this.getAttendanceByDate(today);
    return todayAttendance.some(record => record.studentId === studentId);
  }
}

export const studentDatabase = new StudentDatabase();
