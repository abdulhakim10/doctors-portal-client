import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import bg from '../../../assets/images/bg.png';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header 
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}
        >
            <div className="hero">
                <div className="hero-content flex-col gap-12 lg:flex-row-reverse">
                    <img src={chair} alt='dentist chair' className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                       <DayPicker
                       mode='single'
                       selected={selectedDate}
                       onSelect={setSelectedDate}
                       />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;