"use client";

import React from "react";
import { Card, CardBody, CardHeader, Button, Avatar, Input, Switch } from "@heroui/react";

const SettingsContent = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
        
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-medium">Profile Information</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar 
                size="lg"
                src="https://i.pravatar.cc/150?img=3"
              />
              <div className="flex-1">
                <p className="text-gray-500 mb-1">Profile Picture</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered">Change</Button>
                  <Button size="sm" variant="light" color="danger">Remove</Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="Enter your name" defaultValue="John Doe" />
              <Input label="Email" placeholder="Enter your email" defaultValue="john.doe@example.com" />
              <Input label="Company" placeholder="Enter your company" defaultValue="Acme Inc." />
              <Input label="Role" placeholder="Enter your role" defaultValue="Product Manager" />
            </div>
            
            <div className="flex justify-end">
              <Button color="primary">Save Changes</Button>
            </div>
          </CardBody>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-medium">Password</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                label="Current Password" 
                placeholder="Enter current password" 
                type="password"
              />
              <div></div>
              <Input 
                label="New Password" 
                placeholder="Enter new password" 
                type="password"
              />
              <Input 
                label="Confirm New Password" 
                placeholder="Confirm new password" 
                type="password"
              />
            </div>
            
            <div className="flex justify-end">
              <Button color="primary">Update Password</Button>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Get notified when someone responds to your form</p>
                </div>
                <Switch defaultSelected size="lg" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-gray-500">Receive a weekly summary of your form performance</p>
                </div>
                <Switch defaultSelected size="lg" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-gray-500">Receive news about new features and updates</p>
                </div>
                <Switch size="lg" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default SettingsContent; 