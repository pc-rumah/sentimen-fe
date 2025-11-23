"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    onChange: (file: File | null) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export default function UploadForm({ onChange, onSubmit, disabled }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upload File CSV</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    className="grid w-full max-w-sm items-center gap-4"
                >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="csv-file">File CSV</Label>
                        <Input
                            id="csv-file"
                            type="file"
                            accept=".csv"
                            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                            disabled={disabled}
                        />
                    </div>

                    <Button type="submit" disabled={disabled}>
                        {disabled ? "Memproses..." : "Upload & Mulai Job"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
