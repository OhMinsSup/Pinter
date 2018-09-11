import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const ImageIcon = require('react-icons/lib/io/image');
const styles = require('./WrtieGroupPane.scss');
const cx = classNames.bind(styles);

const UploadIcon = require('react-icons/lib/md/cloud-upload');

const GroupInput: React.SFC<{
    title: string,
    name: string,
    value: string,
    placeholder: string,
    onChange(e: any): void,
}> = ({ title, placeholder, onChange, name, value }) => {
    return (
        <div className={cx('input-wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('title-input')}>
                <input type="text" placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            </div>
        </div>
    )
}

const GroupType: React.SFC<{
    title: string,
    value: string,
    name: string,
    onChange(e: any): void,
}> = ({ title, value, onChange, name }) => {
    return (
        <li>
            <label className={cx('secret')}>
                <input type="radio" name={name} value={value} onChange={onChange}/>
                <span className={cx('check-label')}>
                    {title}
                </span>
            </label>
        </li>
    )
}

type Props = {
    title: string,
    thumbnail: string,
    description: string,
    onChangeInput(e: any): void,
    onUploadClick(): void,
}

class WrtieGroupPane extends React.Component<Props> {
    public render() {
        const { 
            onChangeInput, 
            title, 
            description,
            thumbnail,
            onUploadClick,
        } = this.props;
        return (
            <div className={cx('write-group-pane')}>
                <GroupInput
                    title="그룹 이름"
                    name="title"
                    value={title}
                    placeholder="그룹 이름 입력을 입력해주세요"
                    onChange={onChangeInput}
                />
                <div className={cx('write-thumbnail')}>
                    <div className={cx('preview-thumbnail')}>
                        {
                            thumbnail ? <img className={cx('preview')} src={thumbnail} alt="preview"/> : <ImageIcon className={cx('preview')}/>
                        }
                    </div>
                    <div className={cx('upload-thumbnail')}>
                        <h3 className={cx('title')}>업로드</h3>
                        <div className={cx('upload-mask')} onClick={onUploadClick}>
                            <UploadIcon />
                            <h3>파일을 드래그하여 업로드 하세요</h3>
                        </div>
                    </div>
                </div>
                <GroupInput
                    title="그룹설명"
                    name="description"
                    value={description}
                    placeholder="어떤 그룹인지 입력해주세요"
                    onChange={onChangeInput}
                />
                <div className={cx('write-type')}>
                    <h2 className={cx('type')}>그룹 공개 설정</h2> 
                    <div className={cx('group-type')}>
                        <ul className={cx('type-list')}>
                            <GroupType
                                title="공개"
                                name='visibility'
                                value='public'
                                onChange={onChangeInput}
                            />
                            <GroupType
                                title="비공개"
                                name='visibility'
                                value='private'
                                onChange={onChangeInput}
                            />
                        </ul>
                    </div>
                </div>
                <div className={cx('write-footer')}>
                    <Button className={cx('btn')} theme="outline">취소</Button>
                    <Button className={cx('btn')} theme="default">작성</Button>
                </div>
            </div>
        )
    }
}

export default WrtieGroupPane;