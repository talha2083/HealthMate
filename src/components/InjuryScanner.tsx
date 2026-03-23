/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { analyzeInjury } from '../services/geminiService';
import { InjuryAnalysis } from '../types';
import Markdown from 'react-markdown';

export default function InjuryScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<InjuryAnalysis | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const base64 = image.split(',')[1];
      const result = await analyzeInjury(base64);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
          <Camera size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Injury Scanner</h2>
        <p className="text-sm text-slate-500 max-w-xs">Take a photo or upload an image of a minor injury for basic first aid guidance.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div 
          className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group"
        >
          {image ? (
            <>
              <img src={image} alt="Injury" className="w-full h-full object-cover" />
              <div 
                onClick={() => setImage(null)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <p className="text-white font-bold text-sm">Remove Photo</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full px-6 text-center">
              <Upload className="text-slate-300 mb-2" size={48} />
              <div className="grid grid-cols-1 gap-3 w-full">
                <button 
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm border border-emerald-100"
                >
                  <Camera size={18} />
                  Take Photo
                </button>
                <button 
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100"
                >
                  <Upload size={18} />
                  Upload from Gallery
                </button>
              </div>
              <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">Supports images, documents, and files</p>
            </div>
          )}
          
          {/* Camera Input */}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            ref={cameraInputRef}
            onChange={handleImageUpload}
          />
          
          {/* Gallery/File Input */}
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            className="hidden" 
            ref={galleryInputRef}
            onChange={handleImageUpload}
          />
        </div>

        {image && !analysis && (
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              "Analyze Injury"
            )}
          </button>
        )}

        {analysis && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-2xl flex items-start gap-3 ${
              analysis.severity === 'high' ? 'bg-red-50 text-red-700' : 
              analysis.severity === 'medium' ? 'bg-orange-50 text-orange-700' : 
              'bg-emerald-50 text-emerald-700'
            }`}>
              {analysis.severity === 'high' ? <AlertTriangle size={20} className="shrink-0" /> : 
               analysis.severity === 'medium' ? <Info size={20} className="shrink-0" /> : 
               <CheckCircle size={20} className="shrink-0" />}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">
                  {analysis.type} • {analysis.severity} Severity
                </h4>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Info size={18} className="text-emerald-600" />
                First Aid Guidance
              </h4>
              <div className="text-sm text-slate-600 leading-relaxed markdown-body">
                <Markdown>{analysis.guidance}</Markdown>
              </div>
            </div>

            {analysis.warning && (
              <div className="p-4 rounded-2xl bg-red-600 text-white flex items-start gap-3 shadow-lg shadow-red-100">
                <AlertTriangle size={20} className="shrink-0" />
                <p className="font-bold text-sm">{analysis.warning}</p>
              </div>
            )}

            <button
              onClick={() => { setImage(null); setAnalysis(null); }}
              className="w-full py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold text-sm"
            >
              Start New Scan
            </button>
          </div>
        )}
      </div>
      
      <p className="text-[10px] text-slate-400 text-center px-4">
        DISCLAIMER: This tool provides general guidance only and is not a substitute for professional medical advice. Always consult a doctor for serious injuries.
      </p>
    </div>
  );
}
