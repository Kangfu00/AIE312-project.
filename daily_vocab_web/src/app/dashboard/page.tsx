"use client";

import BarChart from "@/components/BarChart";
import RecentHistory from "@/components/RecentHistory";
import StatsCard from "@/components/StatsCard";
import Skeleton from "@/components/Skeleton"; // อย่าลืม import Skeleton
import { useState, useEffect } from 'react';
import { SummaryResponse } from "@/types";

const API_BASE_URL = 'http://localhost:8000/api';

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/summary`);
        if (!response.ok) throw new Error('Failed to fetch summary');
        
        const data: SummaryResponse = await response.json();
        setSummaryData(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // ⏳ Loading State (แบบสวยงามเข้าธีม)
  if (isLoading) {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#8DA399] p-6 font-sans">
            <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8">
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-5 w-96" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 rounded-2xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-80 rounded-2xl" />
                    <Skeleton className="h-80 rounded-2xl" />
                </div>
            </div>
        </div>
    );
  }
  
  const totalPractices = summaryData?.total_practices ?? 0;
  const averageScore = summaryData?.average_score ?? 0.0;
  const wordsPracticed = summaryData?.total_words_practiced ?? 0;
  const distribution = summaryData?.level_distribution ?? { Beginner: 0, Intermediate: 0, Advanced: 0 };

  return (
    // ✅ พื้นหลังสีเขียว Sage Green (#8DA399)
    <div className="min-h-[calc(100vh-64px)] bg-[#8DA399] p-6 font-sans flex justify-center">
      
      {/* การ์ดสีขาวใหญ่ รองรับเนื้อหา */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 overflow-hidden border border-[#2F3E46]/10">
          
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-serif font-bold text-[#2F3E46] mb-2">Learner Dashboard</h1>
                <p className="text-gray-500">Overview of your vocabulary journey.</p>
              </div>
              
              {/* ปุ่มกลับไปฝึกต่อ */}
              <a href="/" className="mt-4 md:mt-0 px-6 py-2 bg-[#2F3E46] text-white rounded-full font-medium hover:bg-[#1a2429] transition-all shadow-md flex items-center gap-2">
                <span>✎</span> Practice New Word
              </a>
          </div>

          {/* Cards แสดงสถิติ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Total Practices" value={totalPractices.toString()} />
            <StatsCard title="Average Score" value={averageScore.toFixed(1)} />
            <StatsCard title="Words Learned" value={wordsPracticed.toString()} />
          </div>

          {/* กราฟและประวัติ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-[#2F3E46] mb-4">Performance Level</h2>
              <BarChart distribution={distribution} />
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-[#2F3E46] mb-4">Recent History</h2>
              <RecentHistory />
            </div>
          </div>

      </div>
    </div>
  );
}