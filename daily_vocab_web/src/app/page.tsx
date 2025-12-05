"use client";

import { useState, useEffect, useCallback } from 'react';
import { Word, AIResponse, Difficulty } from '@/types';
import Skeleton from '@/components/Skeleton'; // อย่าลืม import Skeleton ด้วยนะครับ

const API_BASE_URL = 'http://localhost:8000/api';

export default function Home() {
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [sentence, setSentence] = useState<string>('');
    const [aiFeedback, setAiFeedback] = useState<AIResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // ฟังก์ชันดึงคำศัพท์ (ใช้สำหรับปุ่ม Skip และ Next Word)
    const getWord = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/word`);
            if (!response.ok) throw new Error('Failed to fetch word');
            const data = await response.json();
            setCurrentWord(data);
            setSentence('');
            setAiFeedback(null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getWord();
    }, [getWord]);

    const handleSubmitSentence = async () => {
        if (!currentWord || !sentence.trim() || isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/validate-sentence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    word_id: currentWord.id,
                    sentence: sentence.trim(),
                }),
            });
            if (!response.ok) throw new Error('Validation failed.');
            const feedbackData: AIResponse = await response.json();
            setAiFeedback(feedbackData);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getDifficultyBadge = (level: Difficulty) => {
        switch (level) {
            case "Beginner": return "bg-[#FDF6B2] text-[#723B13]";
            case "Intermediate": return "bg-blue-100 text-blue-800";
            case "Advanced": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    // Loading Skeleton (ใส่ไว้ให้แล้วตามที่เคยขอมา)
    if (isLoading && !currentWord) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-[#8DA399] flex items-center justify-center p-4 font-sans">
                <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                    <div className="hidden md:block w-1/3 bg-gray-200 animate-pulse"></div>
                    <div className="w-full md:w-2/3 p-8 flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="border-l-4 border-gray-200 pl-4 py-2 space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-10 w-1/3" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="space-y-3 pt-2">
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <div className="flex gap-3">
                                <Skeleton className="h-10 flex-1 rounded-full" />
                                <Skeleton className="h-10 flex-1 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <div className="min-h-screen flex items-center justify-center bg-[#8DA399] text-white font-bold">Error: {error}</div>;
    if (!currentWord) return null;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#8DA399] flex items-center justify-center p-4 font-sans">
            
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                
                {/* รูปภาพ */}
                <div className="hidden md:block w-1/3 relative bg-gray-100">
                   <img 
                     src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop" 
                     alt="Study Atmosphere"
                     className="absolute inset-0 w-full h-full object-cover"
                   />
                </div>

                {/* ส่วนเนื้อหา */}
                <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                    
                    {!aiFeedback ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-serif font-bold text-[#2F3E46]">Word of the day</h2>
                                <p className="text-gray-500 text-sm">Practice writing a meaningful sentence using today&apos;s word.</p>
                            </div>

                            <div className="border-l-4 border-[#2F3E46] pl-4 py-2 bg-gray-50 rounded-r-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-4xl font-serif font-bold text-[#2F3E46] mb-1">{currentWord.word}</h1>
                                        <p className="text-sm text-gray-500 italic">Noun</p> 
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyBadge(currentWord.difficulty_level)}`}>
                                        {currentWord.difficulty_level}
                                    </span>
                                </div>
                                <p className="text-gray-700 mt-3 text-sm">
                                    <span className="font-bold">Meaning:</span> {currentWord.definition}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <textarea
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2F3E46] focus:border-transparent outline-none transition-all text-gray-700 bg-white placeholder:text-gray-300 resize-none"
                                    rows={3}
                                    placeholder={`Compose a sentence with "${currentWord.word}"...`}
                                    value={sentence}
                                    onChange={(e) => setSentence(e.target.value)}
                                    disabled={isLoading}
                                />
                                
                                <div className="flex gap-3 pt-2">
                                    <button 
                                        onClick={getWord}
                                        className="flex-1 py-2 px-4 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Skip Word
                                    </button>
                                    <button
                                        onClick={handleSubmitSentence}
                                        disabled={!sentence.trim() || isLoading}
                                        className="flex-1 py-2 px-4 bg-[#2F3E46] text-white rounded-full font-medium hover:bg-[#1a2429] transition-all shadow-md disabled:opacity-50"
                                    >
                                        {isLoading ? 'Checking...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center animate-fadeIn">
                             <h2 className="text-3xl font-serif font-bold text-[#2F3E46]">Challenge completed</h2>
                             
                             <div className="flex justify-center gap-3 my-4">
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${getDifficultyBadge(currentWord.difficulty_level)}`}>
                                    {currentWord.difficulty_level}
                                </span>
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${aiFeedback.score >= 7 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    Score {aiFeedback.score}
                                </span>
                             </div>

                             <div className="text-left space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Your sentence</p>
                                    <p className="text-gray-800 border-b border-gray-200 pb-2 italic">"{sentence}"</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mt-2 mb-1">Suggestion</p>
                                    <p className="text-[#2F3E46] bg-[#E8F5E9] p-3 rounded-lg text-sm leading-relaxed">
                                        {aiFeedback.suggestion}
                                    </p>
                                </div>
                             </div>

                             {/* 👇 ปุ่มกดไปต่อ (แก้ไขใหม่) */}
                             <div className="flex gap-3 justify-center pt-4">
                                <button
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    View Dashboard
                                </button>
                                <button
                                    onClick={getWord} // กดแล้วโหลดคำใหม่ทันที
                                    className="px-6 py-2 bg-[#2F3E46] text-white rounded-full hover:bg-[#1a2429] transition-colors shadow-md flex items-center gap-2"
                                >
                                    Next Word ➔
                                </button>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}