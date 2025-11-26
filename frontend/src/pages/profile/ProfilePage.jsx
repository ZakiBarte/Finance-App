import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");

  const handleSave = () => {
    updateUser({ ...user, name });
  };

  return (
    <Card className="max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <Input value={user?.email} disabled />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <Button onClick={handleSave}>Save</Button>
      </CardContent>
    </Card>
  );
}
