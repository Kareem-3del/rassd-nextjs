"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {User} from "@prisma/client";

// Backend API endpoint for fetching and creating users
const API_URL = "/api/user";

// Roles with English values and Arabic labels
const roles = [
  { value: "inspector", label: "مفتش" },
  { value: "reviewer", label: "مراجع" },
  { value: "quality_controller", label: "مراقب جودة" },
  { value: "supervisor", label: "مشرف عام" },
  { value: "manager", label: "مدير" },
];

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<any>({ name: "", email: "", role: roles[0].value , phoneNumber : "" , password : "" });
  const [open, setOpen] = useState(false);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL); // Fetch the user data
        setUsers(response.data); // Set the user data in the state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const response = await axios.post(API_URL+"/register", newUser); // Post the new user data to the backend
      setUsers([...users, response.data]); // Add the new user to the table
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
      <Card>
        <div className="flex justify-between p-4">
          <h2 className="text-xl font-bold">
            المستخدمين
          </h2>
          {/* Create User Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button color="primary">إضافة مستخدم جديد</Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold mb-4">إضافة مستخدم جديد</h3>
              <Input
                  placeholder="الاسم"
                  autoComplete={"name"}
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="mb-2"
              />
              <Input
                  placeholder="البريد الإلكتروني"
                    autoComplete={"email"}
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="mb-2"
                  type={"email"}
              />
              <Input
                  placeholder="رقم الهاتف"
                  autoComplete={"tel"}
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                  className="mb-2"
                  type={"tel"}
              />
              <div className="mb-4" >
                <label className="block mb-2 text-right text-sm mr-auto">الدور</label>
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-2 py-2 rounded-md border border-gray-300"
                >
                  {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                  ))}
                </select>
              </div>
                <Input
                    placeholder="كلمة المرور"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="mb-2"
                    type={"password"}
                />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">إلغاء</Button>
                </DialogClose>
                <Button onClick={handleCreateUser}>إضافة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-lg">
                        <AvatarImage src={user.profile || ""} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className="capitalize">
                      {roles.find((role) => role.value === user.role)?.label || user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-3 justify-end">
                    {/* Edit Button */}
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <Icon icon="heroicons:pencil" className="h-4 w-4" />
                    </Button>
                    {/* View Button */}
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <Icon icon="heroicons:eye" className="h-4 w-4" />
                    </Button>
                    {/* Delete Button */}
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <Icon icon="heroicons:trash" className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
  );
};

export default UsersTable;
