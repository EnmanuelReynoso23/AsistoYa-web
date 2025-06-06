import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface StudentCardProps {
  name: string;
  arrivalTime: Date;
  confidence: number;
  studentCode?: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  name, 
  arrivalTime, 
  confidence,
  studentCode
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        
        {/* Student Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">            <div>
              <h4 className="font-semibold text-gray-900">{name}</h4>
              {studentCode && (
                <p className="text-xs text-blue-600 font-mono mb-1">
                  Código: {studentCode}
                </p>
              )}
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>
                  Llegó a las {arrivalTime.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Confianza: {Math.round(confidence * 100)}%
              </p>
            </div>
            
            {/* Status */}
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
              <span className="text-xs text-green-600 font-medium">PRESENTE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
