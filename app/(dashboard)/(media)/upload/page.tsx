import DefaultCardComponent from '@/app/(dashboard)/components/default-card-component';
import UploadFile from './component/upload-file';

const addmedia = () => {
    return (
        <DefaultCardComponent title="Add Media">
            <UploadFile />
        </DefaultCardComponent>
    )
}

export default addmedia