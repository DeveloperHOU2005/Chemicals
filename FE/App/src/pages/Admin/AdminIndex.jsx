import Header from '../../components/layout/HeaderComponent.jsx'
import Dashboard from './Dashboard.jsx';
const AdminIndex = ()=>{
    return(
        <>
            <div className='felx gap-2 overflow-hidden'>
                <Header/>
                <Dashboard/>
            </div>
        </>
    );
}

export default AdminIndex;