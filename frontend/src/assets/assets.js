import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rohan Mehta',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Mehta is dedicated to providing comprehensive healthcare with a strong focus on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: '12th Cross, Indiranagar',
            line2: 'CMH Road, Bengaluru'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Priya Sharma',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Sharma provides compassionate women’s healthcare with an emphasis on preventive checkups, safe maternity care, and early diagnosis.',
        fees: 600,
        address: {
            line1: '4th Block, Koramangala',
            line2: 'Near Forum Mall, Bengaluru'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sneha Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Patel specializes in skin, hair, and nail treatments with a strong focus on modern dermatological procedures.',
        fees: 300,
        address: {
            line1: 'Sector 21B',
            line2: 'Near HUDA Market, Gurgaon'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Arjun Nair',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Nair is committed to providing quality child healthcare, vaccinations, and developmental guidance.',
        fees: 400,
        address: {
            line1: 'Panampilly Nagar',
            line2: 'Ernakulam, Kochi'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Kavita Iyer',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Iyer focuses on diagnosing and treating neurological disorders with modern medical practices.',
        fees: 700,
        address: {
            line1: 'Model Colony',
            line2: 'Shivaji Nagar, Pune'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Manish Verma',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Verma specializes in brain and nerve-related issues, prioritizing accurate diagnosis and effective treatment.',
        fees: 700,
        address: {
            line1: 'Sector 62',
            line2: 'Near Fortis Hospital, Noida'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Sameer Gupta',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Gupta is dedicated to preventive healthcare, chronic disease management, and patient education.',
        fees: 500,
        address: {
            line1: 'Rajajinagar 3rd Block',
            line2: 'Bengaluru'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Shalini Rao',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rao delivers expert gynecological and maternity care with a patient-first approach.',
        fees: 600,
        address: {
            line1: 'Adyar Main Road',
            line2: 'Chennai'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ananya Kapoor',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Kapoor focuses on providing safe and evidence-based treatments for skin and hair concerns.',
        fees: 300,
        address: {
            line1: 'Sector 18',
            line2: 'Near Great India Place Mall, Noida'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Vikram Joshi',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Joshi is committed to giving expert medical care to infants, children, and adolescents.',
        fees: 400,
        address: {
            line1: 'Sion East',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Aisha Khan',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Aisha specializes in neurological conditions and provides patient-focused treatment.',
        fees: 700,
        address: {
            line1: 'Banjara Hills',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Rajat Sinha',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Sinha offers specialized treatment for brain, spine, and nerve disorders with an evidence-based approach.',
        fees: 700,
        address: {
            line1: 'Kankarbagh Main Road',
            line2: 'Patna'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Neha Desai',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Desai provides holistic medical care with a strong emphasis on preventive health.',
        fees: 500,
        address: {
            line1: 'Alkapuri Road',
            line2: 'Vadodara'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ritu Malhotra',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Malhotra is known for her expertise in gynecology, prenatal care, and women’s wellness.',
        fees: 600,
        address: {
            line1: 'Sector 11',
            line2: 'Chandigarh'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Tanvi Singh',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Singh provides modern skincare solutions with a focus on patient comfort and long-term results.',
        fees: 300,
        address: {
            line1: 'Jayanagar 4th Block',
            line2: 'Bengaluru'
        }
    },
];
