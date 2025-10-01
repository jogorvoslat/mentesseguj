import React, { useState } from 'react';
import { Copy, Download, ArrowLeft, Check } from 'lucide-react';

interface BCGResultPageProps {
  content: string;
  onBack: () => void;
}

export const BCGResultPage: React.FC<BCGResultPageProps> = ({ content, onBack }) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    } catch (err) {
      console.error('Másolási hiba:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bcg-oltás-visszautasító-levél.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setShowDownloadSuccess(true);
    setTimeout(() => setShowDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        {(showCopySuccess || showDownloadSuccess) && (
          <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="rounded-lg bg-green-50 p-4 shadow-lg border border-green-200">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <p className="text-sm font-medium text-green-800">
                  {showCopySuccess ? 'Sikeresen vágólapra másolva!' : 'Sikeresen letöltve!'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Vissza a főoldalra
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Copy className="mr-2 h-4 w-4" />
              Másolás
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Letöltés
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Generált BCG Oltás Visszautasító Levél
          </h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap break-words font-sans text-base leading-relaxed text-gray-900">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};