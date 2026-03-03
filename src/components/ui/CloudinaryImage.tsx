import React from 'react';
import { cloudinaryUrl } from '../../lib/cloudinary';

interface CloudinaryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    publicId: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
    transformations?: string;
}

export function CloudinaryImage({
    publicId,
    width = 800,
    height,
    aspectRatio,
    transformations = 'f_auto,q_auto',
    className,
    alt,
    ...props
}: CloudinaryImageProps) {

    const widthParam = width ? `,w_${width}` : '';
    const heightParam = height ? `,h_${height}` : '';
    const arParam = aspectRatio ? `,ar_${aspectRatio},c_fill` : '';

    const finalTransformations = `${transformations}${widthParam}${heightParam}${arParam}`;
    const url = cloudinaryUrl(publicId, finalTransformations);

    return (
        <img
            src={url}
            alt={alt || "Car Image"}
            className={className}
            loading="lazy"
            {...props}
        />
    );
}
