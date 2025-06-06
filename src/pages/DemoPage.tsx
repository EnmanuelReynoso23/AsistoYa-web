import React from 'react';
import { RealTimeFaceRecognition } from '../components/RealTimeFaceRecognition';
import { Container } from '../components/Container';
import { AnimatedPage } from '../components/AnimatedPage';

export default function DemoPage() {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Live Face Recognition Demo
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience our advanced face recognition technology in real-time. 
                This demo showcases how AsistoYa identifies students instantly and accurately.
              </p>
            </div>

            {/* Demo Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Real-Time Recognition
                </h2>
                <p className="text-blue-100">
                  Allow camera access to see the face recognition system in action
                </p>
              </div>
              
              <div className="p-8">
                <RealTimeFaceRecognition />
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Recognition happens in milliseconds, ensuring smooth attendance tracking
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Highly Accurate
                </h3>
                <p className="text-gray-600">
                  Advanced AI algorithms ensure precise identification every time
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  All processing happens locally with enterprise-grade security
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How to Use This Demo
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Step 1: Camera Access</h4>
                  <p className="text-gray-600 text-sm">
                    Click "Allow" when prompted to grant camera access to your browser
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Step 2: Position Yourself</h4>
                  <p className="text-gray-600 text-sm">
                    Position your face within the camera frame for optimal recognition
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Step 3: Real-Time Detection</h4>
                  <p className="text-gray-600 text-sm">
                    Watch as the system detects and analyzes facial features in real-time
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Step 4: See Results</h4>
                  <p className="text-gray-600 text-sm">
                    Observe the confidence levels and detection accuracy displayed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AnimatedPage>
  );
}