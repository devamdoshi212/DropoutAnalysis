import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Resources = () => {
    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const response = await fetch('http://localhost:9999/getReason');
                const result = await response.json();
                setReasons(result.data || []);
            } catch (error) {
                console.error('Error fetching reasons:', error);
            }
        };

        fetchReasons();
    }, []);

    const initialValues = {
        title: '',
        keyword: '',
        standard: '',
        pptFiles: [],
        pdfFiles: [],
        videoFiles: [],
        links: [''],
        dropoutReason: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Please enter a title'),
        keyword: Yup.string(),
        standard: Yup.string(),
        pptFiles: Yup.array(),
        pdfFiles: Yup.array(),
        videoFiles: Yup.array(),
        links: Yup.array().of(
            Yup.string().url('Invalid URL').required('Please enter a link')
        ),
        dropoutReason: Yup.string().required('Please select a dropout reason'),
    });

    const onSubmit = async (values, action) => {
        console.log(values);

        if (values.pdfFiles.length > 0 && values.links.length > 0 && values.pptFiles.length > 0 && values.videoFiles.length > 0) {
            const filesData = {
                pdf: values.pdfFiles,
                pptx: values.pptFiles,
                video: values.videoFiles,
                links: values.links.filter((link) => link.trim() !== ''),
                reason: values.dropoutReason,
                standard: values.standard,
                title: values.title,
                keyword: values.keyword
            };
            console.log(filesData);


            var formdata = new FormData();
            formdata.append("reason", filesData.dropoutReason);
            formdata.append("standard", filesData.standard);
            formdata.append("title", filesData.title);
            formdata.append("keyword", filesData.keyword);

            for (let i = 0; i < filesData.pdf.length; i++) {
                var file = filesData.pdf[i];
                formdata.append("pdf", file, filesData.pdf[i].name);
            }
            for (let i = 0; i < filesData.pptx.length; i++) {
                var file = filesData.pptx[i];
                formdata.append("pptx", file, filesData.pptx[i].name);
            }
            for (let i = 0; i < filesData.video.length; i++) {
                var file = filesData.video[i];
                formdata.append("video", file, filesData.video[i].name);
            }
            for (let i = 0; i < filesData.links.length; i++) {
                formdata.append("links", filesData.links[i]);
            }

            console.log(formdata);
            var requestOptions = {
                method: 'PATCH',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://localhost:9999/addResource?id=${filesData.reason}`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            action.resetForm();
        };
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleFileChange = (event, fileType) => {
        const selectedFiles = Array.from(event.target.files);
        formik.setFieldValue(`${fileType}Files`, selectedFiles);
    };


    const handleLinkChange = (index, value) => {
        formik.setFieldValue(`links[${index}]`, value);
    };

    const addLink = () => {
        formik.setFieldValue('links', [...formik.values.links, '']);
    };

    const removeLink = (index) => {
        const updatedLinks = [...formik.values.links];
        updatedLinks.splice(index, 1);
        formik.setFieldValue('links', updatedLinks);
    };

    return (
        <>
            <div className="bg-[#f8f9fa] m-5 h-screen ">
                <div className="w-3/5 mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600">
                    <h2 className="text-2xl font-semibold mb-5 text-center ">
                        Add Remedies Resources
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                        {/* Dropdown for Dropout Reason */}
                        <div className="mx-5 m-3">
                            <label htmlFor="dropoutReason" className="font-semibold text-gray-500">
                                Select Dropout Reason:
                            </label>
                            <select
                                id="dropoutReason"
                                name="dropoutReason"
                                className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:outline-2 focus:outline-gray-400"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dropoutReason}
                            >
                                <option value="" label="Select a reason" />
                                {reasons.map((reason, index) => (
                                    <option key={index} value={reason._id}>
                                        {reason.reason}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.dropoutReason && formik.errors.dropoutReason && (
                                <div style={{ color: 'red' }}>{formik.errors.dropoutReason}</div>
                            )}
                        </div>

                        {/* Title Input */}
                        <div className="mx-5 m-3">
                            <label htmlFor="title" className="font-semibold text-gray-500">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:outline-2 focus:outline-gray-400"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div style={{ color: 'red' }}>{formik.errors.title}</div>
                            )}
                        </div>

                        {/* Keyword Input */}
                        <div className="mx-5 m-3">
                            <label htmlFor="keyword" className="font-semibold text-gray-500">
                                Keyword:
                            </label>
                            <input
                                type="text"
                                id="keyword"
                                name="keyword"
                                className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:outline-2 focus:outline-gray-400"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.keyword}
                            />
                            {formik.touched.keyword && formik.errors.keyword && (
                                <div style={{ color: 'red' }}>{formik.errors.keyword}</div>
                            )}
                        </div>

                        {/* Standard Dropdown */}
                        <div className="mx-5 m-3">
                            <label htmlFor="standard" className="font-semibold text-gray-500">
                                Standard:
                            </label>
                            <select
                                id="standard"
                                name="standard"
                                className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:outline-2 focus:outline-gray-400"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.standard}
                            >
                                <option value="" label="Select a standard" />
                                <option value="1">Standard 1</option>
                                <option value="2">Standard 2</option>
                                <option value="3">Standard 3</option>
                                <option value="4">Standard 4</option>
                                <option value="5">Standard 5</option>
                                <option value="6">Standard 6</option>
                                <option value="7">Standard 7</option>
                                <option value="8">Standard 8</option>
                                <option value="9">Standard 9</option>
                                <option value="10">Standard 10</option>

                            </select>
                            {formik.touched.standard && formik.errors.standard && (
                                <div style={{ color: 'red' }}>{formik.errors.standard}</div>
                            )}
                        </div>

                        <div className="mx-5 mt-3 space-y-2">
                            <div className="flex">
                                {/* Choose PPT Files */}
                                <label htmlFor="pptFiles" className="font-semibold text-gray-500 mx-3">
                                    Choose PPT Files:
                                </label>
                                <input
                                    id="pptFilesInput"
                                    name="pptFiles"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'ppt')}
                                    onBlur={formik.handleBlur}
                                    accept=".ppt, .pptx"
                                    multiple
                                />
                            </div>

                            {/* Choose PDF Files */}
                            <div className="flex">
                                <label htmlFor="pdfFiles" className="font-semibold text-gray-500 mx-3">
                                    Choose PDF Files:
                                </label>
                                <input
                                    id="pdfFilesInput"
                                    name="pdfFiles"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'pdf')}
                                    onBlur={formik.handleBlur}
                                    accept=".pdf"
                                    multiple
                                />
                            </div>

                            {/* Choose Videos */}
                            <div className="flex">
                                <label htmlFor="videoFiles" className="font-semibold text-gray-500 mx-3">
                                    Choose Videos:
                                </label>
                                <input
                                    id="videoFilesInput"
                                    name="videoFiles"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'video')}
                                    onBlur={formik.handleBlur}
                                    accept="video/mp4,video/x-m4v,video/*"
                                    multiple
                                />
                            </div>
                        </div>

                        <div className="mx-5 mt-3">
                            <label htmlFor="links" className="font-semibold text-gray-500">
                                Enter Links:
                            </label>
                            {formik.values.links.map((link, index) => (
                                <div key={index} className="flex space-x-2 m-1 ">
                                    <input
                                        type="text"
                                        name={`links[${index}]`}
                                        value={link}
                                        onChange={(e) => formik.handleChange(`links[${index}]`)(e)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter link"
                                        className='mt-1 p-1.5 w-2/3 border border-gray-500 rounded-md  focus:outline-2 focus:outline-gray-400'
                                    />
                                    <button type="button" className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-1 px-5 rounded-md hover:bg-blue-600 " onClick={() => addLink(index)}>
                                        Add
                                    </button>
                                    {index > 0 && (
                                        <button type="button" className="mx-5 bg-red-700 text-white font-bold tracking-wider py-1 px-5 rounded-md hover:bg-red-600 " onClick={() => removeLink(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formik.touched.links && formik.errors.links && (
                                <div style={{ color: 'red' }}>{formik.errors.links}</div>
                            )}
                        </div>

                        <div className='flex items-center justify-center'>
                            <button
                                type="submit"
                                className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-3 px-5 rounded-md hover:bg-blue-600 uppercase"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Resources;
