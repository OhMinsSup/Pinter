import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PreviewImage.scss');
const cx = classNames.bind(styles);

type Props = {
    images?: string[] 
}

const PreviewImage: React.SFC<Props> = ({ images }) => { 
    const imagesList = (images as string[]).map((image, index) => {
        return (
            <div key={index} className={cx('composer-image')}>
                <div className={cx('composer-image-container')}>
                    <img key={index} src={image} alt={image}/>
                </div>
            </div>
        )
    });

    return (
        <React.Fragment>
        {
            (images as string[]).length === 0 ? null : (
                <div className={cx('preview-image')}>
                    <div className={cx('image-container')}>
                        <div className={cx('image-wrapper')}>
                            <div className={cx('composer-images')}>
                                {imagesList}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </React.Fragment>
    )
}

PreviewImage.defaultProps = {
    images: [
        "https://velopert.com/wp-content/uploads/2018/04/prettier.png",
        "https://velopert.com/wp-content/uploads/2018/04/shovel.png",
        "https://velopert.com/wp-content/uploads/2018/04/shovel.png",
        "https://velopert.com/wp-content/uploads/2018/04/prettier.png",
        "https://velopert.com/wp-content/uploads/2018/04/shovel.png",
        "https://velopert.com/wp-content/uploads/2018/04/prettier.png",
        "https://velopert.com/wp-content/uploads/2018/04/shovel.png",
    ]
}

export default PreviewImage;