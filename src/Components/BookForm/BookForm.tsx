import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseTitle, chooseAuthor, chooseReleaseYear, chooseDescription } from '../../redux/slices/bookSlice';
import { Input, LongInput } from '../sharedComponents/Input';
import { Button, makeStyles } from '@material-ui/core';
import { server_calls } from '../../api';
import desert_hills from '../../assets/Images/desert_hills1.jpg';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../redux/hooks';


const useStyles = makeStyles({
    root:{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${desert_hills});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
        zIndex: -1,
        padding: '0',
        margin: '0',
    },
    form:{
        marginTop: '6rem',
        width: '20rem',
        height: '27rem',
        marginLeft: '10rem',
        backgroundColor: 'rgb(255, 153, 0, .5)',
        border: '1px solid rgb(255, 153, 0, .5)',
        borderRadius: '5px',
        padding: '10px'
    },
    input:{
        height: '8rem'
    },
    jedi: {
        fontFamily: 'Star Jedi'
    },
    submit: {
        display: 'inline',
        marginLeft: '10rem',
        marginTop: '1rem',
        backgroundColor: 'rgb(87, 204, 153, .7)',
    '&:hover': {
      backgroundColor: 'rgb(100, 204, 153)'
    },
    }
})


interface BookFormProps {
    id?:string,
    data?:{}
}


export const BookForm = (props:BookFormProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const new_book = useAppSelector((state) => state)
    const { register, handleSubmit } = useForm({});
    const history = useHistory();
    const token = useAppSelector((state) => state.root.user_token)

    const onSubmit = (data:any, event:any) => {
        dispatch(chooseTitle(data.title))
        dispatch(chooseAuthor(data.author))
        dispatch(chooseReleaseYear(data.release_year))
        dispatch(chooseDescription(data.description))
        }

    const createBook = () => {
        server_calls.create(token,'books',new_book.book)
        history.push('/archive')
    }

    return (
        <div className={classes.root}>
                <form className={classes.form} onSubmit = {handleSubmit(onSubmit)}>
                <h2 className={classes.jedi}>upload to Your Archives</h2>
                    <div>
                        <Input {...register('title')} name="title" placeholder='book title'/>
                    </div>
                    <div>
                        <Input {...register('author')} name="author" placeholder="author"/>
                    </div>
                    <div>
                        <Input {...register('release_year')} name="release_year" placeholder="release year - [yyyy]" />
                    </div>
                    <div>
                        <LongInput {...register('description')} name="description" placeholder="description - max 500 char"/>
                    </div>
                    <Button type='submit'>Load</Button>
                </form>
                <Button className={classes.submit} onClick={createBook}>Post</Button>
        </div>
    )
}