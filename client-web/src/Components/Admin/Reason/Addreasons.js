import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addreasons = () => {
    const formik = useFormik({
        initialValues: {
            reason: '',
            subReasons: [''], // Assuming there is at least one sub-reason
        },
        validationSchema: Yup.object({
            reason: Yup.string().required('Reason is required'),
            subReasons: Yup.array().of(Yup.string().required('Sub-reason is required')),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "reason": values.reason,
                "category": values.subReasons
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:9999/addReason", requestOptions)
                .then(response => response.text())
                .then(result => { action.resetForm(); })
                .catch(error => console.log('error', error));
        },
    });

    const addLink = () => {
        formik.setFieldValue('subReasons', [...formik.values.subReasons, '']);
    };

    const removeLink = (index) => {
        const updatedSubReasons = [...formik.values.subReasons];
        updatedSubReasons.splice(index, 1);
        formik.setFieldValue('subReasons', updatedSubReasons);
    };

    return (
        <>
            <div className="bg-[#f8f9fa] m-5 h-screen ">
                <div className="w-3/5 mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md shadow-gray-600">
                    <h2 className="text-2xl font-semibold mb-5 text-center ">
                        Add Reasons
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mx-5">
                            <div>
                                <label className="font-semibold text-gray-500">
                                    Add Reason :
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        name="reason"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.reason}
                                        placeholder='Enter Reason'
                                        className="mt-1 p-1.5 w-2/3 border border-gray-500 rounded-md  focus:outline-2 focus:outline-gray-400"
                                    />
                                </div>
                            </div>
                            {formik.touched.reason && formik.errors.reason ? (
                                <div className="text-red-500">{formik.errors.reason}</div>
                            ) : null}
                        </div>

                        <div className="mx-5 mt-3">
                            <label className="font-semibold text-gray-500">
                                Enter Sub-reason :
                            </label>
                            {formik.values.subReasons.map((subReason, index) => (
                                <div key={index} className="flex space-x-2 m-1">
                                    <input
                                        type="text"
                                        placeholder="Enter Sub-reasons"
                                        name={`subReasons.${index}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subReasons[index]}
                                        className="mt-1 p-1.5 w-2/3 border border-gray-500 rounded-md  focus:outline-2 focus:outline-gray-400"
                                    />
                                    <button
                                        type="button"
                                        className="mx-5 bg-blue-700 text-white font-bold tracking-wider py-1 px-5 rounded-md hover:bg-blue-600"
                                        onClick={() => addLink()}
                                    >
                                        Add
                                    </button>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="mx-5 bg-red-700 text-white font-bold tracking-wider py-1 px-5 rounded-md hover:bg-red-600"
                                            onClick={() => removeLink(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formik.touched.subReasons && formik.errors.subReasons ? (
                                <div className="text-red-500">{formik.errors.subReasons}</div>
                            ) : null}
                        </div>

                        <div className="flex items-center justify-center my-5">
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

export default Addreasons;
