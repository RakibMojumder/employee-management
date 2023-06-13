import * as Yup from 'yup'

export const addUserSchema = Yup.object({
    firstName: Yup.string().required('This is required field'),
    LastName: Yup.string().required('This is required field'),
    // division: Yup.string().min(2).required('This is required field'),
    // district: Yup.string().min(2).required('This is required field'),
})