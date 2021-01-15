import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, FormLabel, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TagInput } from 'reactjs-tag-input';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';


const StyledAddCategory = styled.div`
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


const AddCategory = () => {
    
    const classes = useStyles();
    const [categoryName, setcategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [subcategoryCount, setSubcategoryCount] = useState([1]);
    const [subCategoryName, setSubCategoryName] = useState('');
    const [tags, setTags] = useState([]);
    

    const handleOnSubmit = () => {
        const fd = new FormData();

        for(let i=0 ; i<tags.length ; i++){
            fd.append(`tags[]`, tags[i]);
        }
        
        fd.append('category_name', categoryName);
        fd.append('description', description);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/category', fd, config)
        .then(response => {
            location.reload();
        })
    }

    const handleChange = (tags) => {
        setTags(tags)
    }
    
    return (
        <div className="content">
            <div className="container">
                <StyledAddCategory>
                    <center>
                        <h3>Add a category</h3>
                        <hr />
                        <form >
                        <TextField type="text" placeholder="Category Name" required onChange={(e) => {
                            setcategoryName(e.target.value);
                        }} />
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
                        <FormLabel className={classes.input}>
                            Subcategory (Press Enter After Write a Subcategory to Add More):
                        </FormLabel>
                        <br />
                        <TagsInput value={tags} onChange={handleChange} placeholder={"Click Enter to Add New Subcategory"} />
                        </form>
                    </center>
                    <br />
                    <Button onClick={handleOnSubmit} variant="contained" color="primary">Save</Button>
                    <br />
                    <br />
                </StyledAddCategory>
            </div>
        </div>
    )
}

export default withRouter(AddCategory);

