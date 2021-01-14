import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, FormLabel, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StyledAddProduct = styled.div`
    background-color: white;
    padding: 20px;
    width: 100%;
`;

const useStyles = makeStyles({
    root: {
        minWidth: 400
    },
    input: {
        marginTop: 20
    }
})

const AddProduct = () => {
    
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    
    const fileSelectedHandler = (e) => {
        // setImages(e.target.files)
        let imagesArray = [];

        for( let i = 0 ; i < e.target.files.length ; i++){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[i]);
            fileReader.onload = (e) => {
                imagesArray.push(e.target.result);
                setImages(imagesArray)
            }
        }
    }

    const handleOnSubmit = () => {
        // console.log(productName);
        // console.log(price);
        // console.log(images);
        // console.log(description);

        const fd = new FormData();

        for(let i=0 ; i<images.length ; i++){
            fd.append(`images[]`, images[i]);
        }
        
        fd.append('product_name', productName);
        fd.append('price', price);
        fd.append('description', description);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/product', fd, config)
        .then(response => {
            console.log('s', response);
        })
    }

    return (
        <div className="content">
            <div className="container">
                <StyledAddProduct>
                    <center>
                        <h3>Add a Product</h3>
                        <hr />
                        <form >
                        <TextField type="text" placeholder="Product Name" required onChange={(e) => {
                            setProductName(e.target.value);
                        }} />
                        <br />
                        <TextField className={classes.input} type="number" placeholder="Price" required onChange={e => {
                            setPrice(e.target.value);
                        }} />
                        <br />
                        <FormLabel className={classes.input}>
                            Images:
                        </FormLabel>
                        <br />
                        <input type="file" multiple onChange={fileSelectedHandler} />
                        <br />
                        <FormLabel className={classes.input}>
                            Description:
                        </FormLabel>
                        <br />
                        <br />
                        <CKEditor
                            className={classes.input}
                            editor={ ClassicEditor }
                            config={{
                                removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                              }}
                              
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data);
                            } }
                        />
                        </form>
                    </center>
                    <br />
                    <Button onClick={handleOnSubmit} variant="contained" color="primary">Save</Button>
                    <br />
                    <br />
                </StyledAddProduct>
            </div>
        </div>
    )
}

export default withRouter(AddProduct);

