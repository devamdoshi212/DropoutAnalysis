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

    const onSubmit = async (values, action) => {
        if (values.files.length > 0 && values.links.length > 0) {
            const filesData = {
                files: values.files,
                links: values.links.filter((link) => link.trim() !== ''),
                dropoutReason: values.dropoutReason,
            };
            console.log('Files ans Links data submitted:', filesData);
            console.log(filesData.files)
            var formdata = new FormData();
            formdata.append("reason", filesData.dropoutReason);

            console.log(filesData.files);
            for (let i = 0; i < filesData.files.length; i++) {
                var file = filesData.files[i];
                formdata.append("resources", file, filesData.files[i].name);
            }
            for (let i = 0; i < filesData.links.length; i++) {
                var link = filesData.links[i];
                formdata.append("links", link);
            }

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:9999/addReason", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        // action.resetForm();
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
        <div className="bg-[#f8f9fa] m-5 h-screen ">
        <div className="w-3/5 mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600">
        <h2 className="text-2xl font-semibold mb-5 text-center ">
           Add Remedies Resources
        </h2>
            <form onSubmit={formik.handleSubmit} >
                <div className="mx-5 ">
                  <div className="flex ">
                    <label htmlFor="files" className="font-semibold text-gray-500 mx-3">
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
                    </div>
                    {formik.touched.files && formik.errors.files && (
                        <div style={{ color: 'red' }}>{formik.errors.files}</div>
                    )}
                </div>

                <div className="mx-5 mt-3">

                    <label htmlFor="links" className="font-semibold text-gray-500">
                        Enter Links :
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
                            <button type="button"   className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-1 px-5 rounded-md hover:bg-blue-600 " onClick={() => addLink(index)}>
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

                <div className="mx-5 m-3">
                    <label htmlFor="dropoutReason" className="font-semibold text-gray-500">
                        Select Dropout Reason:
                    </label>
                    <input type="text" id='dropoutReason' name='dropoutReason' className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:outline-2 focus:outline-gray-400"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dropoutReason} />

                    {formik.touched.dropoutReason && formik.errors.dropoutReason && (
                        <div style={{ color: 'red' }}>{formik.errors.dropoutReason}</div>
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
