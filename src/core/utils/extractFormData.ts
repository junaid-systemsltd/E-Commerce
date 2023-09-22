const extractFormData = (formData: FormData) => {
    const data: any = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    return data;
};

export default extractFormData;
