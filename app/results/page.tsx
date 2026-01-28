"use client";

import { useState } from "react";
import MainShell from "@/components/layout/MainShell";
import { shortlistedTeams, waitlistedTeams } from "@/data/shortlistedTeams";

export default function ResultsPage() {
  return (
    <MainShell>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="font-pixel text-4xl md:text-6xl text-green-400 mb-6 animate-slide-in-down">
              Shortlisted Teams
            </h1>
            <h2 className="text - 2xl md:text-3xl text-blue-300 mb-4 animate-slide-in-down delay-100">
              CONGRATULATIONS!!
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              Here are the list of finalists of the Hackerrupt'26
            </p>
            <p className="text-gray-400 text-sm">
                Registration fee payment link will be shared with shortlisted teams via email.
              </p>
       
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600/20 to-purple-600/20 border-b border-gray-600">
                      <th className="px-6 py-4 text-left text-green-400 font-bold">PS ID</th>
                      <th className="px-6 py-4 text-left text-green-400 font-bold">Email ID</th>
                      <th className="px-6 py-4 text-left text-green-400 font-bold">College Name</th>
                      <th className="px-6 py-4 text-left text-green-400 font-bold">Team Name</th>
                      <th className="px-6 py-4 text-left text-green-400 font-bold">Team Leader</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortlistedTeams.map((team, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-purple-400 font-semibold">{team.psid}</td>
                        <td className="px-6 py-4 text-gray-300">{team.email}</td>
                        <td className="px-6 py-4 text-gray-300">{team.college}</td>
                        <td className="px-6 py-4 text-yellow-400 font-semibold">{team.teamName}</td>
                        <td className="px-6 py-4 text-cyan-400">{team.teamLeader}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {shortlistedTeams.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No teams have been shortlisted yet.</p>
              </div>
            )}

            {/* Waitlisted Teams Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl text-orange-400 mb-4 font-bold">
                  Waitlisted Teams
                </h2>
                <p className="text-gray-400 text-sm">
                  Teams on the waitlist will be notified on or before 29th January 2026, if spots become available.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-b border-gray-600">
                        <th className="px-6 py-4 text-left text-orange-400 font-bold">PS ID</th>
                        <th className="px-6 py-4 text-left text-orange-400 font-bold">Email ID</th>
                        <th className="px-6 py-4 text-left text-orange-400 font-bold">College Name</th>
                        <th className="px-6 py-4 text-left text-orange-400 font-bold">Team Name</th>
                        <th className="px-6 py-4 text-left text-orange-400 font-bold">Team Leader</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitlistedTeams.map((team, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-orange-400 font-semibold">{team.psid}</td>
                          <td className="px-6 py-4 text-gray-300">{team.email}</td>
                          <td className="px-6 py-4 text-gray-300">{team.college}</td>
                          <td className="px-6 py-4 text-yellow-400 font-semibold">{team.teamName}</td>
                          <td className="px-6 py-4 text-cyan-400">{team.teamLeader}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {waitlistedTeams.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No teams are currently waitlisted.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </MainShell>
  );
}