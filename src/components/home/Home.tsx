import { useSelector } from 'react-redux';

import { getUser } from 'reducers/user';

import Documents from 'components/pageComponents/Documents';
import Tabs from 'components/pageComponents/Tabs';

import { ReactComponent as Logo } from '../logo.svg';
import './home.scss';


function Home() {

    const user = useSelector(getUser);

    return (
        <div className="container-home" >

            <div className="page">

                <div className="banner">
                    <div className="logo">
                        <Logo width="56" height="56" />
                    </div>
                    <div className="title">Hi, {user.name}.</div>

                </div>

                <div className="page-container">
                    <div className="page-heading">Your documents</div>


                    <Documents documents={[{id:'asd', title:"New Zealand Passport", subTitle:"Department of Internal Affairs"}]} />

                </div>




            </div>

            <Tabs tab={0} />


        </div>
    );
}



export default Home;