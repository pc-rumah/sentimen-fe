"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export default function ApiStatus() {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // Assuming the root endpoint returns 200 or similar
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
                    method: "GET",
                });
                setIsOnline(res.ok);
            } catch (e) {
                setIsOnline(false);
            }
        };

        checkHealth();
        // Poll every 30 seconds
        const interval = setInterval(checkHealth, 90000);
        return () => clearInterval(interval);
    }, []);

    if (isOnline === null) return null;

    return (
        <div className="fixed top-4 left-4 z-50">
            <Badge
                variant={isOnline ? "default" : "destructive"}
                className="flex items-center gap-2"
            >
                {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                {isOnline ? "API Online" : "API Offline"}
            </Badge>
        </div>
    );
}
