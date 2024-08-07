"use client"

import React, { useState } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

function UploadForm({ uploadBtnClick, progress }) {
    const [file, setFile] = useState();
    const [errorMsg, setErrorMsg] = useState();

    const onFileSelect = async (file) => {
        if (!file) return;

        // Check file size
        if (file.size > 5000000) {
            setErrorMsg('Maximum File Upload Size is 5MB');
            return;
        }

        // Check file type
        const allowedTypes = [
            'image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf', 
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        const disallowedTypes = [
            'application/x-msdownload', 'application/x-msdos-program', 'application/x-msdos-windows', 
            'application/x-ms-shortcut', 'application/x-msi', 'application/x-exe', 
            'application/octet-stream', 'application/xml', 'text/xml'
        ];

        if (disallowedTypes.includes(file.type)) {
            setErrorMsg('Executable or XML files are not allowed');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setErrorMsg('Only PNG, JPG, SVG, PDF, and Word files are allowed');
            return;
        }

        // Basic file extension check for extra security
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'pdf', 'doc', 'docx'];
        const disallowedExtensions = ['exe', 'msi', 'bat', 'cmd', 'sh', 'js', 'vbs', 'com', 'pif', 'scr', 'lnk', 'jar', 'xml'];

        if (disallowedExtensions.includes(fileExtension)) {
            setErrorMsg('Executable or XML files are not allowed');
            return;
        }

        if (!allowedExtensions.includes(fileExtension)) {
            setErrorMsg('File type not supported');
            return;
        }

        setErrorMsg(null);
        setFile(file);
    };

    return (
        <div className='text-center'>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col 
                items-center justify-center w-full h-64 border-2
                border-blue-300 border-dashed 
                rounded-lg cursor-pointer
                bg-blue-50 dark:hover:bg-bray-800
                dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center 
                    justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-lg md:text-2xl text-gray-500
                        dark:text-gray-400">
                            <span className="font-semibold">
                                Click to upload</span>
                            or <strong className='text-primary'>
                                drag</strong> and <strong className='text-primary'>drop</strong></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, SVG, PDF, or Word (Max Size: 5MB)</p>
                    </div>
                    <input id="dropzone-file"
                        type="file" className="hidden"
                        onChange={(event) => { onFileSelect(event.target.files[0]) }} />
                </label>
            </div>
            {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
            {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}
            {progress > 0 ? <ProgressBar progress={progress} /> :
                <button disabled={!file} className='p-2 bg-primary text-white
                w-[30%] rounded-full mt-5 disabled:bg-gray-400'
                    onClick={() => uploadBtnClick(file)}>
                    Upload</button>}
        </div>
    );
}

export default UploadForm;
