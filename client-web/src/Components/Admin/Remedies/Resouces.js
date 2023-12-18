import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Resources = () => {
    const fileInitialValues = {
        files: [],
        dropoutReason: '',
    };

    const linkInitialValues = {
        links: [''],
        dropoutReason: '',
    };

    const validationSchemaFile = Yup.object().shape({
        files: Yup.array().min(1, 'Please choose at least one file'),
        dropoutReason: Yup.string().required('Please select a dropout reason for files'),
    });

    const validationSchemaLink = Yup.object().shape({
        links: Yup.array().of(Yup.string().url('Invalid URL')),
        dropoutReason: Yup.string().required('Please select a dropout reason for links'),
    });

    const onSubmitFile = async (values) => {
        // ... (Previous submit file logic)

        const filesData = {
            files: values.files,
            dropoutReason: values.dropoutReason,
        };

        // Send filesData to your server using fetch or axios
        // ...

        console.log('Files data submitted:', filesData);
    };

    const onSubmitLink = async (values) => {
        // ... (Previous submit link logic)

        const linksData = {
            links: values.links.filter((link) => link.trim() !== ''),
            dropoutReason: values.dropoutReason,
        };

        // Send linksData to your server using fetch or axios
        // ...

        console.log('Links data submitted:', linksData);
    };

    const formikFile = useFormik({
        initialValues: fileInitialValues,
        validationSchema: validationSchemaFile,
        onSubmit: onSubmitFile,
    });

    const formikLink = useFormik({
        initialValues: linkInitialValues,
        validationSchema: validationSchemaLink,
        onSubmit: onSubmitLink,
    });

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        formikFile.setFieldValue('files', selectedFiles);
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...formikLink.values.links];
        updatedLinks[index] = value;
        formikLink.setFieldValue('links', updatedLinks);
    };

    const addLink = (index) => {
        const updatedLinks = [...formikLink.values.links];
        updatedLinks.splice(index + 1, 0, '');
        formikLink.setFieldValue('links', updatedLinks);
    };

    const removeLink = (index) => {
        const updatedLinks = [...formikLink.values.links];
        updatedLinks.splice(index, 1);
        formikLink.setFieldValue('links', updatedLinks);
    };

    return (
        <>
            {/* Form for submitting files */}
            <form onSubmit={formikFile.handleSubmit} className='w-96'>
                <div className="mx-5 space-x-3">
                    <label htmlFor="files" className="font-semibold text-gray-500">
                        Choose Files :
                    </label>
                    <input
                        id="fileInput"
                        name="files"
                        type="file"
                        onChange={handleFileChange}
                        onBlur={formikFile.handleBlur}
                        accept=".jpg, .jpeg, .png, .gif, .mp4, .docx, .pptx, .pdf"
                        multiple
                    />
                    {formikFile.touched.files && formikFile.errors.files && (
                        <div style={{ color: 'red' }}>{formikFile.errors.files}</div>
                    )}
                </div>

                {/* Dropdown for selecting dropout reason */}
                <div className="mx-5 mt-3">
                    <label htmlFor="dropoutReasonFile" className="font-semibold text-gray-500">
                        Select Dropout Reason (Files) :
                    </label>
                    <select
                        id="dropoutReasonFile"
                        name="dropoutReason"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
                        onChange={formikFile.handleChange}
                        onBlur={formikFile.handleBlur}
                        value={formikFile.values.dropoutReason}
                    >
                        <option value="">Select Reason</option>
                        {/* Add more options for dropout reasons */}
                    </select>
                    {formikFile.touched.dropoutReason && formikFile.errors.dropoutReason && (
                        <div style={{ color: 'red' }}>{formikFile.errors.dropoutReason}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-2 px-5 rounded-md hover:bg-blue-600 uppercase"
                >
                    Submit Files
                </button>
            </form>

            {/* Form for submitting links */}
            <form onSubmit={formikLink.handleSubmit} className='w-96'>
                {/* Section for entering links */}
                <div className="mx-5 space-y-3 mt-5">
                    <label htmlFor="links" className="font-semibold text-gray-500">
                        Enter Links :
                    </label>
                    {formikLink.values.links.map((link, index) => (
                        <div key={index} className="flex space-x-2">
                            <input
                                type="text"
                                name={`links[${index}]`}
                                value={link}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                onBlur={formikLink.handleBlur}
                                placeholder="Enter link"
                            />
                            <button type="button" onClick={() => addLink(index)}>
                                Add Link
                            </button>
                            {index > 0 && (
                                <button type="button" onClick={() => removeLink(index)}>
                                    Remove Link
                                </button>
                            )}
                        </div>
                    ))}
                    {formikLink.touched.links && formikLink.errors.links && (
                        <div style={{ color: 'red' }}>{formikLink.errors.links}</div>
                    )}
                </div>

                {/* Dropdown for selecting dropout reason */}
                <div className="mx-5 mt-3">
                    <label htmlFor="dropoutReasonLink" className="font-semibold text-gray-500">
                        Select Dropout Reason (Links) :
                    </label>
                    <select
                        id="dropoutReasonLink"
                        name="dropoutReason"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
                        onChange={formikLink.handleChange}
                        onBlur={formikLink.handleBlur}
                        value={formikLink.values.dropoutReason}
                    >
                        <option value="">Select Reason</option>
                        {/* Add more options for dropout reasons */}
                    </select>
                    {formikLink.touched.dropoutReason && formikLink.errors.dropoutReason && (
                        <div style={{ color: 'red' }}>{formikLink.errors.dropoutReason}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-2 px-5 rounded-md hover:bg-blue-600 uppercase"
                >
                    Submit Links
                </button>
            </form>
        </>
    );
};

export default Resources;
