import React, { useState } from 'react';
import { User, MapPin, CreditCard, Lock, Bell, LogOut, Edit2, Save, X, Monitor, Tablet, Smartphone } from 'lucide-react';

const AccountDetailsPage = () => {
  // Sample user data - replace with actual data from your API/state management
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+84 123 456 789',
      birthday: '1990-01-15',
      avatar: '/api/placeholder/150/150'
    },
    addresses: [
      {
        id: 1,
        type: 'Home',
        street: '123 Nguyen Hue Street',
        district: 'District 1',
        city: 'Ho Chi Minh City',
        province: 'Ho Chi Minh',
        postalCode: '700000',
        country: 'Vietnam',
        isDefault: true
      },
      {
        id: 2,
        type: 'Work',
        street: '456 Le Loi Street',
        district: 'District 3',
        city: 'Ho Chi Minh City',
        province: 'Ho Chi Minh',
        postalCode: '700000',
        country: 'Vietnam',
        isDefault: false
      }
    ],
    preferences: {
      language: 'Vietnamese',
      currency: 'VND',
      notifications: {
        email: true,
        sms: false,
        promotions: true
      }
    }
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('personal');
  
  // State for edit mode
  const [editMode, setEditMode] = useState({
    personal: false,
    address: null // null or address id being edited
  });

  // Handle input changes for personal info
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      personalInfo: {
        ...userData.personalInfo,
        [name]: value
      }
    });
  };

  // Toggle edit mode for personal info
  const togglePersonalEditMode = () => {
    setEditMode({
      ...editMode,
      personal: !editMode.personal
    });
  };

  // Save personal info changes
  const savePersonalInfo = () => {
    // Here you would typically make an API call to update the user info
    console.log("Saving personal info:", userData.personalInfo);
    setEditMode({ ...editMode, personal: false });
  };

  // Toggle edit mode for an address
  const toggleAddressEditMode = (addressId) => {
    setEditMode({
      ...editMode,
      address: editMode.address === addressId ? null : addressId
    });
  };

  // Handle input changes for address
  const handleAddressChange = (addressId, field, value) => {
    setUserData({
      ...userData,
      addresses: userData.addresses.map(address => 
        address.id === addressId ? { ...address, [field]: value } : address
      )
    });
  };

  // Save address changes
  const saveAddress = (addressId) => {
    // Here you would typically make an API call to update the address
    console.log("Saving address:", userData.addresses.find(a => a.id === addressId));
    setEditMode({ ...editMode, address: null });
  };

  // Set an address as default
  const setDefaultAddress = (addressId) => {
    setUserData({
      ...userData,
      addresses: userData.addresses.map(address => ({
        ...address,
        isDefault: address.id === addressId
      }))
    });
  };

  // Add new address
  const addNewAddress = () => {
    const newAddress = {
      id: Date.now(), // temporary id
      type: 'Other',
      street: '',
      district: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'Vietnam',
      isDefault: userData.addresses.length === 0
    };
    
    setUserData({
      ...userData,
      addresses: [...userData.addresses, newAddress]
    });
    
    setEditMode({
      ...editMode,
      address: newAddress.id
    });
  };

  // Handle notification preference changes
  const toggleNotificationPreference = (type) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        notifications: {
          ...userData.preferences.notifications,
          [type]: !userData.preferences.notifications[type]
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Details</h1>
        
        {/* Account Navigation */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex flex-col items-center mb-4">
                <img 
                  src={userData.personalInfo.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h2 className="text-xl font-semibold">{`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}</h2>
                <p className="text-gray-500 text-sm">{userData.personalInfo.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${activeTab === 'personal' ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <User size={18} className="mr-3" />
                  Personal Information
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${activeTab === 'addresses' ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <MapPin size={18} className="mr-3" />
                  Addresses
                </button>
                <button 
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${activeTab === 'preferences' ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Bell size={18} className="mr-3" />
                  Preferences
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 rounded-md ${activeTab === 'security' ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Lock size={18} className="mr-3" />
                  Security
                </button>
                <hr className="my-2" />
                <button className="w-full flex items-center px-3 py-2 text-red-600 rounded-md hover:bg-red-50">
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    {!editMode.personal ? (
                      <button 
                        onClick={togglePersonalEditMode}
                        className="flex items-center text-teal-600 hover:text-teal-800"
                      >
                        <Edit2 size={16} className="mr-1" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={savePersonalInfo}
                          className="flex items-center text-green-600 hover:text-green-800"
                        >
                          <Save size={16} className="mr-1" />
                          Save
                        </button>
                        <button 
                          onClick={togglePersonalEditMode}
                          className="flex items-center text-gray-600 hover:text-gray-800"
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      {editMode.personal ? (
                        <input 
                          type="text" 
                          name="firstName"
                          value={userData.personalInfo.firstName}
                          onChange={handlePersonalInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.personalInfo.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      {editMode.personal ? (
                        <input 
                          type="text" 
                          name="lastName"
                          value={userData.personalInfo.lastName}
                          onChange={handlePersonalInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.personalInfo.lastName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      {editMode.personal ? (
                        <input 
                          type="email" 
                          name="email"
                          value={userData.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.personalInfo.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      {editMode.personal ? (
                        <input 
                          type="tel" 
                          name="phone"
                          value={userData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.personalInfo.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                      {editMode.personal ? (
                        <input 
                          type="date" 
                          name="birthday"
                          value={userData.personalInfo.birthday}
                          onChange={handlePersonalInfoChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ) : (
                        <p className="text-gray-900">{new Date(userData.personalInfo.birthday).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Addresses</h2>
                    <button 
                      onClick={addNewAddress}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {userData.addresses.map(address => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium">{address.type}</h3>
                              {address.isDefault && (
                                <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {editMode.address !== address.id ? (
                              <button 
                                onClick={() => toggleAddressEditMode(address.id)}
                                className="flex items-center text-teal-600 hover:text-teal-800"
                              >
                                <Edit2 size={16} className="mr-1" />
                                Edit
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => saveAddress(address.id)}
                                  className="flex items-center text-green-600 hover:text-green-800"
                                >
                                  <Save size={16} className="mr-1" />
                                  Save
                                </button>
                                <button 
                                  onClick={() => toggleAddressEditMode(address.id)}
                                  className="flex items-center text-gray-600 hover:text-gray-800"
                                >
                                  <X size={16} className="mr-1" />
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {editMode.address === address.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                              <select 
                                value={address.type}
                                onChange={(e) => handleAddressChange(address.id, 'type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                              <input 
                                type="text" 
                                value={address.street}
                                onChange={(e) => handleAddressChange(address.id, 'street', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                              <input 
                                type="text" 
                                value={address.district}
                                onChange={(e) => handleAddressChange(address.id, 'district', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                              <input 
                                type="text" 
                                value={address.city}
                                onChange={(e) => handleAddressChange(address.id, 'city', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                              <input 
                                type="text" 
                                value={address.province}
                                onChange={(e) => handleAddressChange(address.id, 'province', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                              <input 
                                type="text" 
                                value={address.postalCode}
                                onChange={(e) => handleAddressChange(address.id, 'postalCode', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                              <input 
                                type="text" 
                                value={address.country}
                                onChange={(e) => handleAddressChange(address.id, 'country', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              />
                            </div>
                            
                            <div className="md:col-span-2">
                              <label className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={address.isDefault}
                                  onChange={() => setDefaultAddress(address.id)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-700">{address.street}</p>
                            <p className="text-gray-700">{address.district}, {address.city}</p>
                            <p className="text-gray-700">{address.province}, {address.postalCode}</p>
                            <p className="text-gray-700">{address.country}</p>
                            
                            {!address.isDefault && (
                              <button 
                                onClick={() => setDefaultAddress(address.id)}
                                className="mt-3 text-sm text-teal-600 hover:text-teal-800"
                              >
                                Set as default
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select 
                          value={userData.preferences.language}
                          onChange={(e) => setUserData({
                            ...userData,
                            preferences: {
                              ...userData.preferences,
                              language: e.target.value
                            }
                          })}
                          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="English">English</option>
                          <option value="Vietnamese">Vietnamese</option>
                          <option value="French">French</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <select 
                          value={userData.preferences.currency}
                          onChange={(e) => setUserData({
                            ...userData,
                            preferences: {
                              ...userData.preferences,
                              currency: e.target.value
                            }
                          })}
                          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="VND">VND - Vietnamese Dong</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="JPY">JPY - Japanese Yen</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive order updates and account notices via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={userData.preferences.notifications.email}
                            onChange={() => toggleNotificationPreference('email')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Receive order updates and account notices via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={userData.preferences.notifications.sms}
                            onChange={() => toggleNotificationPreference('sms')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <h4 className="font-medium">Promotional Emails</h4>
                          <p className="text-sm text-gray-500">Receive emails about promotions and special offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={userData.preferences.notifications.promotions}
                            onChange={() => toggleNotificationPreference('promotions')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Tab */}
              {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <button 
                      type="button"
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="p-4 bg-gray-50 rounded-md mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recent Login Activity</h4>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Smartphone size={16} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-900">iPhone 14 Pro</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Ho Chi Minh City, Vietnam</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Today, 11:23 AM</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Current</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Monitor size={16} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-900">Windows PC</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Da Nang, Vietnam</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Apr 13, 2025, 3:45 PM</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Successful</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Tablet size={16} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-900">iPad Air</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Hanoi, Vietnam</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Apr 10, 2025, 9:12 AM</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Successful</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Smartphone size={16} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-900">Unknown Device</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Singapore</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">Apr 5, 2025, 2:18 PM</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                </div>
                
                {/* Account Security Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Account Security</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium">Sessions Management</h4>
                        <p className="text-sm text-gray-500">Log out from all other devices</p>
                      </div>
                      <button className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Sign out all devices
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium">Account Recovery Email</h4>
                        <p className="text-sm text-gray-500">Manage backup email for account recovery</p>
                      </div>
                      <button className="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Manage
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium">Security Questions</h4>
                        <p className="text-sm text-gray-500">Update your security questions</p>
                      </div>
                      <button className="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Account Deletion Section */}
                <div className="mt-8 border-t pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
)};


export default AccountDetailsPage