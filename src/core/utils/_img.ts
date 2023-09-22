const _img = (imgName: string) =>
    `${process.env['NEXT_PUBLIC_BASE_URL']}/images/${imgName}`;

export default _img;
