import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PreviewImage.scss');
const cx = classNames.bind(styles);

type Props = {}

const PreviewImage: React.SFC<Props> = ({ }) => {
    const images = [
        "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350",
        "https://velopert.com/wp-content/uploads/2018/07/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA-2018-07-24-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-4.58.00-1.png",
        "https://velopert.com/wp-content/uploads/2018/04/prettier.png",
        "https://velopert.com/wp-content/uploads/2018/04/shovel.png",
    ]    
    return (
        <div className={cx('preview-image')}>
            <div className={cx('wrapper')}>
                {   
                    
                    images.map((i) => {
                        return <img key={i} src={i} alt="test"/>
                    })
                    
                }
            </div>
        </div>
    )
}

export default PreviewImage;