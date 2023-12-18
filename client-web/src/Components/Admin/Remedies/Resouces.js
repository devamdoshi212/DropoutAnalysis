import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Resources = () => {
    const initialValues = {
        files: [],
        links: [''],
        dropoutReason: '',
    };

    const validationSchema = Yup.object().shape({
        files: Yup.array().min(1, 'Please choose at least one file'),
        links: Yup.array().of(
            Yup.string().url('Invalid URL').required('Please enter a link')
        ),
        dropoutReason: Yup.string().required('Please select a dropout reason'),
    });

    const onSubmit = async (values) => {
        if (values.files.length > 0 && values.links.length > 0) {
            const filesData = {
                files: values.files,
                links: values.links.filter((link) => link.trim() !== ''),
                dropoutReason: values.dropoutReason,
            };
            console.log('Files ans Links data submitted:', filesData);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        formik.setFieldValue('files', selectedFiles);
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
            <form onSubmit={formik.handleSubmit} className='w-96'>
                <div className="mx-5 space-x-3">
                    <label htmlFor="files" className="font-semibold text-gray-500">
                        Choose Files :
                    </label>
                    <input
                        id="fileInput"
                        name="files"
                        type="file"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                        accept=".jpg, .jpeg, .png, .gif, .mp4, .docx, .pptx, .pdf"
                        multiple
                    />
                    {formik.touched.files && formik.errors.files && (
                        <div style={{ color: 'red' }}>{formik.errors.files}</div>
                    )}
                </div>

                <div className="mx-5 mt-3">
                    <label htmlFor="links" className="font-semibold text-gray-500">
                        Enter Links :
                    </label>
                    {formik.values.links.map((link, index) => (
                        <div key={index} className="flex space-x-2">
                            <input
                                type="text"
                                name={`links[${index}]`}
                                value={link}
                                onChange={(e) => formik.handleChange(`links[${index}]`)(e)}
                                onBlur={formik.handleBlur}
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
                    {formik.touched.links && formik.errors.links && (
                        <div style={{ color: 'red' }}>{formik.errors.links}</div>
                    )}
                </div>

                <div className="mx-5 mt-3">
                    <label htmlFor="dropoutReason" className="font-semibold text-gray-500">
                        Select Dropout Reason:
                    </label>
                    <input type="text" id='dropoutReason' name='dropoutReason' className="mt-1 p-2 w-full border rounded-md focus:outline-2 focus:outline-gray-400"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dropoutReason} />

                    {formik.touched.dropoutReason && formik.errors.dropoutReason && (
                        <div style={{ color: 'red' }}>{formik.errors.dropoutReason}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-2 px-5 rounded-md hover:bg-blue-600 uppercase"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Resources;
