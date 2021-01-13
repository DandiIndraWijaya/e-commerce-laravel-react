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
    
    const fileSelectedHandler = (e) => {
        setImages(e.target.files)
    }

    const handleOnSubmit = () => {
        console.log(productName);
        console.log(price);
        console.log(images);
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
                            data="<p>Hello from CKEditor 5!</p>"

                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( data );
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

