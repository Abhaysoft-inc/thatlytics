"use client";

import { useState } from "react";

export default function Test2FAPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [totpToken, setTotpToken] = useState("");

    const [secretInfo, setSecretInfo] = useState<{ uri: string; secret: string } | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

    // Use your backend URL
    const API_BASE = "http://localhost:3001/api/v1/auth";

    const handleGenerate = async () => {
        try {
            const res = await fetch(`${API_BASE}/2fa/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setSecretInfo({ uri: data.uri, secret: data.secret });
                addLog(`Generated 2FA: ${JSON.stringify(data)}`);
            } else {
                addLog(`Error 2FA Generate: ${JSON.stringify(data)}`);
            }
        } catch (err: any) {
            addLog(`Error: ${err.message}`);
        }
    };

    const handleVerify = async () => {
        try {
            const res = await fetch(`${API_BASE}/2fa/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token: totpToken }),
            });
            const data = await res.json();
            if (res.ok) {
                addLog(`Verified 2FA: ${JSON.stringify(data)}`);
            } else {
                addLog(`Error 2FA Verify: ${JSON.stringify(data)}`);
            }
        } catch (err: any) {
            addLog(`Error: ${err.message}`);
        }
    };

    const handleLogin = async () => {
        try {
            const body: any = { email, password };
            if (totpToken) {
                body.totpToken = totpToken;
            }

            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok || res.status === 202) {
                addLog(`Login Response: ${JSON.stringify(data)}`);
            } else {
                addLog(`Login Error: ${JSON.stringify(data)}`);
            }
        } catch (err: any) {
            addLog(`Error: ${err.message}`);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Test 2FA Flow</h1>

            <div className="flex flex-col gap-4 border p-4 rounded shadow-sm">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded text-black"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded text-black"
                />
                <input
                    type="text"
                    placeholder="TOTP Token (6 digits)"
                    value={totpToken}
                    onChange={(e) => setTotpToken(e.target.value)}
                    className="border p-2 rounded text-black"
                />
            </div>

            <div className="flex gap-4 flex-wrap">
                <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
                    1. Generate 2FA
                </button>
                <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 rounded">
                    2. Verify 2FA
                </button>
                <button onClick={handleLogin} className="bg-purple-600 text-white px-4 py-2 rounded">
                    3. Login
                </button>
            </div>

            {secretInfo && (
                <div className="border p-4 rounded bg-gray-50 flex flex-col gap-2 items-start text-black">
                    <p><strong>Secret Key:</strong> {secretInfo.secret}</p>
                    <p className="break-all"><strong>URI:</strong> {secretInfo.uri}</p>
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(secretInfo.uri)}`}
                        alt="QR Code"
                    />
                </div>
            )}

            <div className="border p-4 rounded bg-gray-900 text-green-400 font-mono text-sm h-64 overflow-y-auto">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                ))}
            </div>
        </div>
    );
}
