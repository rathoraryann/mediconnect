import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../store/slices/adminSlice";
import { setDoctorToken } from "../store/slices/valueSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.admin.token);
  const dToken = useSelector((state) => state.value.dToken);

  const logout = () => {
    navigate('/')
    token && dispatch(setToken({ data: "" }));
    token && localStorage.removeItem("token");
    dToken && dispatch(setDoctorToken({data: ""}))
    dToken && localStorage.removeItem('dToken')
  };
  return (
    <div className="flex justify-between items-center px-8 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-sm">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="md:text-3xl text-2xl font-semibold leading-tight cursor-pointer"
        >
          MediConnect
        </h1>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {token ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
