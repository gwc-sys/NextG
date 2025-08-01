import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Resource {
    id: number;
    title: string;
    file_url: string;
    upload_date: string;
    file_type: string;
    size: string;
    branch?: string;
}

const BRANCHES = [
    'CSE', 'ECE', 'EEE', 'ME', 'CE', 
    'IT', 'AIML', 'DS', 'AERO', 'AUTO',
    'BIOTECH', 'CHEM', 'META', 'MINING', 'PROD'
];

const ResourcesPage = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [branch, setBranch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    // Fetch resources from Django backend
    useEffect(() => {
        const fetchResources = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/resources/');
                setResources(response.data);
                setFilteredResources(response.data);
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError('Failed to load resources');
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredResources(resources);
        } else {
            const filtered = resources.filter(resource =>
                resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (resource.branch && resource.branch.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredResources(filtered);
        }
    }, [searchQuery, resources]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile || !title) {
            setError('Please select a file and provide a title');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile); // selectedFile is your PDF file
        formData.append('title', title);
        if (branch) formData.append('branch', branch);

        try {
            setIsLoading(true);
            setError('');
            setIsUploadSuccess(false);

            await axios.post('http://localhost:8000/api/resources/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // handle success (refresh list, clear form, etc.)
        } catch (err) {
            setError('File upload failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getFileIcon = (fileType: string) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                );
            case 'docx':
                return (
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'pptx':
                return (
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Engineering Resource Hub
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover, share, and collaborate on the best engineering resources across all branches
                    </p>
                </div>

                {/* Search and Upload Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Search Panel */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search resources by title, branch, or keyword..."
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Resource Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p className="text-sm font-medium text-blue-800">Total Resources</p>
                                <p className="text-2xl font-bold text-blue-600">{resources.length}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <p className="text-sm font-medium text-green-800">Branches</p>
                                <p className="text-2xl font-bold text-green-600">{BRANCHES.length}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <p className="text-sm font-medium text-purple-800">This Week</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {resources.filter(r => new Date(r.upload_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                                </p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                <p className="text-sm font-medium text-amber-800">Downloads</p>
                                <p className="text-2xl font-bold text-amber-600">1.2K+</p>
                            </div>
                        </div>

                        {/* Quick Branch Filters */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Filter by Branch</h3>
                            <div className="flex flex-wrap gap-2">
                                {BRANCHES.slice(0, 6).map((br) => (
                                    <button
                                        key={br}
                                        onClick={() => setSearchQuery(br)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${searchQuery === br ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                    >
                                        {br}
                                    </button>
                                ))}
                                {BRANCHES.length > 6 && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    >
                                        View All
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Upload Panel */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Resource</h2>
                        {isUploadSuccess && (
                            <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm">
                                Resource uploaded successfully!
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource Title*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Data Structures Notes"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                                    Branch
                                </label>
                                <select
                                    id="branch"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Branch</option>
                                    {BRANCHES.map((br) => (
                                        <option key={br} value={br}>{br}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File Upload*
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    accept=".pdf,.docx,.pptx,.txt"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PDF, DOCX, PPTX up to 10MB
                                        </p>
                                    </div>
                                </div>
                                {selectedFile && (
                                    <div className="mt-2 flex items-center text-sm text-gray-600">
                                        <svg className="flex-shrink-0 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span className="truncate">{selectedFile.name}</span>
                                        <span className="ml-2 text-gray-500">{formatFileSize(selectedFile.size)}</span>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </>
                                ) : 'Upload Resource'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Resources List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                Latest Resources
                                {searchQuery && (
                                    <span className="ml-2 text-sm font-normal text-gray-500">
                                        (Filtered by "{searchQuery}")
                                    </span>
                                )}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                    Showing {filteredResources.length} of {resources.length} resources
                                </span>
                            </div>
                        </div>
                    </div>

                    {isLoading && !filteredResources.length ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error && !filteredResources.length ? (
                        <div className="p-6 bg-red-50 border-l-4 border-red-500">
                            <p className="text-red-700">{error}</p>
                        </div>
                    ) : filteredResources.length === 0 ? (
                        <div className="p-6 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchQuery ? 'Try a different search term' : 'Be the first to upload a resource!'}
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredResources.map((resource) => (
                                <li key={resource.id} className="hover:bg-gray-50 transition-colors">
                                    <div className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {getFileIcon(resource.file_type)}
                                            </div>
                                            <div className="ml-4 flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-blue-600 truncate">
                                                        {resource.title}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            {resource.branch || 'General'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <span className="mr-2">{resource.file_type.toUpperCase()}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>{resource.size}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>{formatDate(resource.upload_date)}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a
                                                    href={resource.file_url}
                                                    download
                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Call to Action */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="lg:w-0 lg:flex-1">
                                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                    Join our engineering community
                                </h2>
                                <p className="mt-3 max-w-3xl text-lg leading-6 text-blue-100">
                                    Connect with thousands of students, share knowledge, and collaborate on projects.
                                </p>
                            </div>
                            <div className="mt-8 flex lg:mt-0 lg:ml-8">
                                <div className="inline-flex rounded-md shadow">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                                    >
                                        Sign up free
                                    </a>
                                </div>
                                <div className="ml-3 inline-flex rounded-md shadow">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 bg-opacity-60 hover:bg-opacity-70"
                                    >
                                        Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResourcesPage;