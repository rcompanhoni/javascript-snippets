import small from '../assets/small.jpg';
import '../styles/image_viewer.css';

// add small image
export default () => {
    const image = document.createElement('img');
    image.src = small;

    document.body.appendChild(image);
};