import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { LayOut } from 'features/common'
import 'features/user/style/UserLayout.scss'
import "features/user/style/UserRegister.scss"
import { CheckList } from '..';
import { existRequest, joinRequest } from '../reducer/userSlice';

/**
 * 생년월일/나이/핸드폰번호 추가하기. 
 * Form Validation Schema
 */
const schema = yup.object().shape({
  username: yup.string().required('이름을 입력해주세요'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '패스워드가 너무 짧습니다. 8자 이상 입력해주세요')
    .max(8, '잘못된 입력입니다.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], '번호가 일치하지않습니다.'),
  birth: yup.string().required('**주민번호 앞 6 자리**')
            .min(6, '너무 짧습니다.')
            .max(6, '잘못된 입력입니다.'),
  address: yup.string().required('거주 도시명 까지만 적어주세요.')
              .min(2, '너무 짧습니다.')
              .max(2, '잘못된 입력입니다.'),

});

const defaultValues = {
  username: '',
  email: '',
  phone: '',
  birth: '',
  password: '',
  address: '',
};

export default function Register3Page() {
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch()

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <LayOut>
      <div className="User-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card
              square
            >
              <CardContent >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  <div className="flex items-center mb-48">
                    <img className='login-img' src={require("features/user/images/paper-pencil.png").default} />
                    <div className="border-l-1 mr-4 w-1 h-40" />
                    <div>
                      <Typography className="text-24 font-semibold logo-text" color="inherit">
                      </Typography>
                      <Typography
                        class="text-16 tracking-widest -mt-8 font-700"
                        color="textSecondary"
                      >
                        회원가입
                      </Typography>
                    </div>
                  </div>
                </motion.div>
                <form
                  name="registerForm"
                  noValidate
                  className="flex flex-col justify-center w-full"
                  onSubmit={handleSubmit(async (data) => { await dispatch(joinRequest({ ...data, })) })}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="이름"
                        autoFocus
                        type="username"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                  <Controller
                    id='email'
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="이메일"
                        type="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                {/* <button onClick={handleSubmit(async (data) => {await dispatch(existRequest(data))})}>중복체크</button> */}
                <button type="button" onClick={async ()=>{await dispatch(existRequest(getValues().email))}}>중복체크</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="핸드폰 번호"
                        type="text"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Controller
                    name="birth"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="생년월일"
                        type="text"
                        error={!!errors.birth}
                        helperText={errors?.birth?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="주소"
                        type="address"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="비밀번호"
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="passwordConfirm"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="비밀번호 확인"
                        type="passwordConfirm"
                        error={!!errors.passwordConfirm}
                        helperText={errors?.passwordConfirm?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <CheckList/>
                    <Button style={{'margin-top' : '60px'}}
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="Register"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                  >
                    Create an account
                  </Button>
                </form>
              </CardContent>



              <div className="flex flex-col items-center justify-center pb-32">
                <span className="font-normal">이미 회원이신가요?</span>
                <Link className="font-normal" to="/users/Login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  로그인하기
                </Link>
              
              </div>
              
            </Card>


            <div className="Register3-rightSection hidden md:flex flex-1 items-center justify-center p-64">
              <div className="max-w-320">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                >
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        </div>
        {/* <div style={{marginTop: "-442px"}}>
        <CheckList/>
        </div> */}
    </LayOut>
  );
}

