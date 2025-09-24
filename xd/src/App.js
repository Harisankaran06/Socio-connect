import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Loginpage.js';
import NextLoginTamilNadu from './Tamilnadu/NLTN.js';
import InterfaceMC2 from './Tamilnadu/MC/MC2/INTMC2.js';
import DPTN from './Tamilnadu/MC/MC1/DP/DPMC1.js';

// MC1 Department imports
import ELEMC1 from './Tamilnadu/MC/MC1/DP/ELEMC1.js';
import WATMC1 from './Tamilnadu/MC/MC1/DP/WATMC1.js';
import SANMC1 from './Tamilnadu/MC/MC1/DP/SANMC1.js';
import ROAMC1 from './Tamilnadu/MC/MC1/DP/ROAMC1.js';
import PWDMC1 from './Tamilnadu/MC/MC1/DP/PWDMC1.js';

import DBTNMC2 from './Tamilnadu/MC/MC2/DBMC2.js';
import DPTNMC2 from './Tamilnadu/MC/MC2/DPMC2.js';
import MAPTNMC2 from './Tamilnadu/MC/MC2/MAPMC2.js';
import ANATNMC2 from './Tamilnadu/MC/MC2/ANAMC2.js';
import PERTNMC2 from './Tamilnadu/MC/MC2/PERMC2.js';

// MC3 imports
import INTMC3 from './Tamilnadu/MC/MC3/INTMC3.js';
import DBMC3 from './Tamilnadu/MC/MC3/DBMC3.js';
import DPMC3 from './Tamilnadu/MC/MC3/DPMC3.js';
import MAPMC3 from './Tamilnadu/MC/MC3/MAPMC3.js';
import ANAMC3 from './Tamilnadu/MC/MC3/ANAMC3.js';
import PERMC3 from './Tamilnadu/MC/MC3/PERMC3.js';

// MC4 imports
import INTMC4 from './Tamilnadu/MC/MC4/INTMC4.js';
import DBMC4 from './Tamilnadu/MC/MC4/DBMC4.js';
import DPMC4 from './Tamilnadu/MC/MC4/DPMC4.js';
import MAPMC4 from './Tamilnadu/MC/MC4/MAPMC4.js';
import ANAMC4 from './Tamilnadu/MC/MC4/ANAMC4.js';
import PERMC4 from './Tamilnadu/MC/MC4/PERMC4.js';

// MC5 imports
import INTMC5 from './Tamilnadu/MC/MC5/INTMC5.js';
import DBMC5 from './Tamilnadu/MC/MC5/DBMC5.js';
import DPMC5 from './Tamilnadu/MC/MC5/DPMC5.js';
import MAPMC5 from './Tamilnadu/MC/MC5/MAPMC5.js';
import ANAMC5 from './Tamilnadu/MC/MC5/ANAMC5.js';
import PERMC5 from './Tamilnadu/MC/MC5/PERMC5.js';

// MC6 imports
import INTMC6 from './Tamilnadu/MC/MC6/INTMC6.js';
import DBMC6 from './Tamilnadu/MC/MC6/DBMC6.js';
import DPMC6 from './Tamilnadu/MC/MC6/DPMC6.js';
import MAPMC6 from './Tamilnadu/MC/MC6/MAPMC6.js';
import ANAMC6 from './Tamilnadu/MC/MC6/ANAMC6.js';
import PERMC6 from './Tamilnadu/MC/MC6/PERMC6.js';

// MC7 imports
import INTMC7 from './Tamilnadu/MC/MC7/INTMC7.js';
import DBMC7 from './Tamilnadu/MC/MC7/DBMC7.js';
import DPMC7 from './Tamilnadu/MC/MC7/DPMC7.js';
import MAPMC7 from './Tamilnadu/MC/MC7/MAPMC7.js';
import ANAMC7 from './Tamilnadu/MC/MC7/ANAMC7.js';
import PERMC7 from './Tamilnadu/MC/MC7/PERMC7.js';

// MC8 imports
import INTMC8 from './Tamilnadu/MC/MC8/INTMC8.js';
import DBMC8 from './Tamilnadu/MC/MC8/DBMC8.js';
import DPMC8 from './Tamilnadu/MC/MC8/DPMC8.js';
import MAPMC8 from './Tamilnadu/MC/MC8/MAPMC8.js';
import ANAMC8 from './Tamilnadu/MC/MC8/ANAMC8.js';
import PERMC8 from './Tamilnadu/MC/MC8/PERMC8.js';

// MC9 imports
import INTMC9 from './Tamilnadu/MC/MC9/INTMC9.js';
import DBMC9 from './Tamilnadu/MC/MC9/DBMC9.js';
import DPMC9 from './Tamilnadu/MC/MC9/DPMC9.js';
import MAPMC9 from './Tamilnadu/MC/MC9/MAPMC9.js';
import ANAMC9 from './Tamilnadu/MC/MC9/ANAMC9.js';
import PERMC9 from './Tamilnadu/MC/MC9/PERMC9.js';

// MC10 imports
import INTMC10 from './Tamilnadu/MC/MC10/INTMC10.js';
import DBMC10 from './Tamilnadu/MC/MC10/DBMC10.js';
import DPMC10 from './Tamilnadu/MC/MC10/DPMC10.js';
import MAPMC10 from './Tamilnadu/MC/MC10/MAPMC10.js';
import ANAMC10 from './Tamilnadu/MC/MC10/ANAMC10.js';
import PERMC10 from './Tamilnadu/MC/MC10/PERMC10.js';

// MC11 imports
import INTMC11 from './Tamilnadu/MC/MC11/INTMC11.js';
import DBMC11 from './Tamilnadu/MC/MC11/DBMC11.js';
import DPMC11 from './Tamilnadu/MC/MC11/DPMC11.js';
import MAPMC11 from './Tamilnadu/MC/MC11/MAPMC11.js';
import ANAMC11 from './Tamilnadu/MC/MC11/ANAMC11.js';
import PERMC11 from './Tamilnadu/MC/MC11/PERMC11.js';

// MC12 imports
import INTMC12 from './Tamilnadu/MC/MC12/INTMC12.js';
import DBMC12 from './Tamilnadu/MC/MC12/DBMC12.js';
import DPMC12 from './Tamilnadu/MC/MC12/DPMC12.js';
import MAPMC12 from './Tamilnadu/MC/MC12/MAPMC12.js';
import ANAMC12 from './Tamilnadu/MC/MC12/ANAMC12.js';
import PERMC12 from './Tamilnadu/MC/MC12/PERMC12.js';

// MC13 imports
import INTMC13 from './Tamilnadu/MC/MC13/INTMC13.js';
import DBMC13 from './Tamilnadu/MC/MC13/DBMC13.js';
import DPMC13 from './Tamilnadu/MC/MC13/DPMC13.js';
import MAPMC13 from './Tamilnadu/MC/MC13/MAPMC13.js';
import ANAMC13 from './Tamilnadu/MC/MC13/ANAMC13.js';
import PERMC13 from './Tamilnadu/MC/MC13/PERMC13.js';

// MC14 imports
import INTMC14 from './Tamilnadu/MC/MC14/INTMC14.js';
import DBMC14 from './Tamilnadu/MC/MC14/DBMC14.js';
import DPMC14 from './Tamilnadu/MC/MC14/DPMC14.js';
import MAPMC14 from './Tamilnadu/MC/MC14/MAPMC14.js';
import ANAMC14 from './Tamilnadu/MC/MC14/ANAMC14.js';
import PERMC14 from './Tamilnadu/MC/MC14/PERMC14.js';

// MC15 imports
import INTMC15 from './Tamilnadu/MC/MC15/INTMC15.js';
import DBMC15 from './Tamilnadu/MC/MC15/DBMC15.js';
import DPMC15 from './Tamilnadu/MC/MC15/DPMC15.js';
import MAPMC15 from './Tamilnadu/MC/MC15/MAPMC15.js';
import ANAMC15 from './Tamilnadu/MC/MC15/ANAMC15.js';
import PERMC15 from './Tamilnadu/MC/MC15/PERMC15.js';

// MC16 imports
import INTMC16 from './Tamilnadu/MC/MC16/INTMC16.js';
import DBMC16 from './Tamilnadu/MC/MC16/DBMC16.js';
import DPMC16 from './Tamilnadu/MC/MC16/DPMC16.js';
import MAPMC16 from './Tamilnadu/MC/MC16/MAPMC16.js';
import ANAMC16 from './Tamilnadu/MC/MC16/ANAMC16.js';
import PERMC16 from './Tamilnadu/MC/MC16/PERMC16.js';

// MC17 imports
import INTMC17 from './Tamilnadu/MC/MC17/INTMC17.js';
import DBMC17 from './Tamilnadu/MC/MC17/DBMC17.js';
import DPMC17 from './Tamilnadu/MC/MC17/DPMC17.js';
import MAPMC17 from './Tamilnadu/MC/MC17/MAPMC17.js';
import ANAMC17 from './Tamilnadu/MC/MC17/ANAMC17.js';
import PERMC17 from './Tamilnadu/MC/MC17/PERMC17.js';

// MC18 imports
import INTMC18 from './Tamilnadu/MC/MC18/INTMC18.js';
import DBMC18 from './Tamilnadu/MC/MC18/DBMC18.js';
import DPMC18 from './Tamilnadu/MC/MC18/DPMC18.js';
import MAPMC18 from './Tamilnadu/MC/MC18/MAPMC18.js';
import ANAMC18 from './Tamilnadu/MC/MC18/ANAMC18.js';
import PERMC18 from './Tamilnadu/MC/MC18/PERMC18.js';

// MC19 imports
import INTMC19 from './Tamilnadu/MC/MC19/INTMC19.js';
import DBMC19 from './Tamilnadu/MC/MC19/DBMC19.js';
import DPMC19 from './Tamilnadu/MC/MC19/DPMC19.js';
import MAPMC19 from './Tamilnadu/MC/MC19/MAPMC19.js';
import ANAMC19 from './Tamilnadu/MC/MC19/ANAMC19.js';
import PERMC19 from './Tamilnadu/MC/MC19/PERMC19.js';

// MC20 imports
import INTMC20 from './Tamilnadu/MC/MC20/INTMC20.js';
import DBMC20 from './Tamilnadu/MC/MC20/DBMC20.js';
import DPMC20 from './Tamilnadu/MC/MC20/DPMC20.js';
import MAPMC20 from './Tamilnadu/MC/MC20/MAPMC20.js';
import ANAMC20 from './Tamilnadu/MC/MC20/ANAMC20.js';
import PERMC20 from './Tamilnadu/MC/MC20/PERMC20.js';

// MC21 imports
import INTMC21 from './Tamilnadu/MC/MC21/INTMC21.js';
import DBMC21 from './Tamilnadu/MC/MC21/DBMC21.js';
import DPMC21 from './Tamilnadu/MC/MC21/DPMC21.js';
import MAPMC21 from './Tamilnadu/MC/MC21/MAPMC21.js';
import ANAMC21 from './Tamilnadu/MC/MC21/ANAMC21.js';
import PERMC21 from './Tamilnadu/MC/MC21/PERMC21.js';

// MC22 imports
import INTMC22 from './Tamilnadu/MC/MC22/INTMC22.js';
import DBMC22 from './Tamilnadu/MC/MC22/DBMC22.js';
import DPMC22 from './Tamilnadu/MC/MC22/DPMC22.js';
import MAPMC22 from './Tamilnadu/MC/MC22/MAPMC22.js';
import ANAMC22 from './Tamilnadu/MC/MC22/ANAMC22.js';
import PERMC22 from './Tamilnadu/MC/MC22/PERMC22.js';

// MC23 imports
import INTMC23 from './Tamilnadu/MC/MC23/INTMC23.js';
import DBMC23 from './Tamilnadu/MC/MC23/DBMC23.js';
import DPMC23 from './Tamilnadu/MC/MC23/DPMC23.js';
import MAPMC23 from './Tamilnadu/MC/MC23/MAPMC23.js';
import ANAMC23 from './Tamilnadu/MC/MC23/ANAMC23.js';
import PERMC23 from './Tamilnadu/MC/MC23/PERMC23.js';

// MC24 imports
import INTMC24 from './Tamilnadu/MC/MC24/INTMC24.js';
import DBMC24 from './Tamilnadu/MC/MC24/DBMC24.js';
import DPMC24 from './Tamilnadu/MC/MC24/DPMC24.js';
import MAPMC24 from './Tamilnadu/MC/MC24/MAPMC24.js';
import ANAMC24 from './Tamilnadu/MC/MC24/ANAMC24.js';
import PERMC24 from './Tamilnadu/MC/MC24/PERMC24.js';

// MC25 imports
import INTMC25 from './Tamilnadu/MC/MC25/INTMC25.js';
import DBMC25 from './Tamilnadu/MC/MC25/DBMC25.js';
import DPMC25 from './Tamilnadu/MC/MC25/DPMC25.js';
import MAPMC25 from './Tamilnadu/MC/MC25/MAPMC25.js';
import ANAMC25 from './Tamilnadu/MC/MC25/ANAMC25.js';
import PERMC25 from './Tamilnadu/MC/MC25/PERMC25.js';

import NLJK from './Jharkand/NLJK.js';
import Interface from './Tamilnadu/MC/MC1/INTMC1.js';
import INTJK from './Jharkand/INTJK.js';
import DBTN from './Tamilnadu/MC/MC1/DB/DBMC1.js';
import OPEMC1 from './Tamilnadu/MC/MC1/DB/OPEMC1.js';
import PROMC1 from './Tamilnadu/MC/MC1/DB/PROMC1.js';
import RESMC1 from './Tamilnadu/MC/MC1/DB/RESMC1.js';
import SUCMC1 from './Tamilnadu/MC/MC1/DB/SUCMC1.js';
import CLOMC1 from './Tamilnadu/MC/MC1/DB/CLOMC1.js';
import DBJK from './Jharkand/DBJK.js';
import DPJK from './Jharkand/DPJK.js';
import MAPTN from './Tamilnadu/MC/MC1/MAPMC1.js';
import MAPJK from './Jharkand/MAPJK.js';
import ANATN from './Tamilnadu/MC/MC1/ANAMC1.js';
import ANAJK from './Jharkand/ANAJK.js';
import PERTN from './Tamilnadu/MC/MC1/PERMC1.js';
import TOTMC1 from './Tamilnadu/MC/MC1/DB/TOTMC1.js';

import PERJK from './Jharkand/PERJK.js';

// A new, simplified App component that handles navigation
function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={(route) => navigate(route)} />} />
      <Route path="/nltn" element={<NextLoginTamilNadu onNext={() => navigate('/interface')} />} />
      <Route path="/nljk" element={<NLJK onNext={(route) => navigate(route)} />} />
      <Route path="/interface" element={<Interface />} />
      <Route path="/intmc1" element={<Interface />} />
      <Route path="/intmc2" element={<InterfaceMC2 />} />
      <Route path="/interfacemc2" element={<InterfaceMC2 />} />
      <Route path="/intjk" element={<INTJK />} />
      <Route path="/dbtn" element={<DBTN />} />
  <Route path="/opemc1" element={<OPEMC1 />} />
  <Route path="/promc1" element={<PROMC1 />} />
  <Route path="/resmc1" element={<RESMC1 />} />
  <Route path="/sucmc1" element={<SUCMC1 />} />
  <Route path="/clomc1" element={<CLOMC1 />} />
      <Route path="/totmc1" element={<TOTMC1 />} />
      
      {/* MC1 Department Routes */}
      <Route path="/tamilnadu/mc1/elemc1" element={<ELEMC1 />} />
      <Route path="/tamilnadu/mc1/watmc1" element={<WATMC1 />} />
      <Route path="/tamilnadu/mc1/sanmc1" element={<SANMC1 />} />
      <Route path="/tamilnadu/mc1/roamc1" element={<ROAMC1 />} />
      <Route path="/tamilnadu/mc1/pwdmc1" element={<PWDMC1 />} />
      
      <Route path="/dbtnmc2" element={<DBTNMC2 />} />
      <Route path="/dbjk" element={<DBJK />} />
      <Route path="/dptn" element={<DPTN />} />
      <Route path="/dptnmc2" element={<DPTNMC2 />} />
      <Route path="/dpjk" element={<DPJK />} />
      <Route path="/maptn" element={<MAPTN />} />
      <Route path="/maptnmc2" element={<MAPTNMC2 />} />
      <Route path="/mapjk" element={<MAPJK />} />
      <Route path="/anatn" element={<ANATN />} />
      <Route path="/anatnmc2" element={<ANATNMC2 />} />
      <Route path="/anajk" element={<ANAJK />} />
      <Route path="/pertn" element={<PERTN />} />
      <Route path="/pertnmc2" element={<PERTNMC2 />} />
      <Route path="/perjk" element={<PERJK />} />
      
      {/* MC3 Routes */}
      <Route path="/intmc3" element={<INTMC3 />} />
      <Route path="/dbmc3" element={<DBMC3 />} />
      <Route path="/dpmc3" element={<DPMC3 />} />
      <Route path="/mapmc3" element={<MAPMC3 />} />
      <Route path="/anamc3" element={<ANAMC3 />} />
      <Route path="/permc3" element={<PERMC3 />} />
      
      {/* MC4 Routes */}
      <Route path="/intmc4" element={<INTMC4 />} />
      <Route path="/dbmc4" element={<DBMC4 />} />
      <Route path="/dpmc4" element={<DPMC4 />} />
      <Route path="/mapmc4" element={<MAPMC4 />} />
      <Route path="/anamc4" element={<ANAMC4 />} />
      <Route path="/permc4" element={<PERMC4 />} />
      
      {/* MC5 Routes */}
      <Route path="/intmc5" element={<INTMC5 />} />
      <Route path="/dbmc5" element={<DBMC5 />} />
      <Route path="/dpmc5" element={<DPMC5 />} />
      <Route path="/mapmc5" element={<MAPMC5 />} />
      <Route path="/anamc5" element={<ANAMC5 />} />
      <Route path="/permc5" element={<PERMC5 />} />
      
      {/* MC6 Routes */}
      <Route path="/intmc6" element={<INTMC6 />} />
      <Route path="/dbmc6" element={<DBMC6 />} />
      <Route path="/dpmc6" element={<DPMC6 />} />
      <Route path="/mapmc6" element={<MAPMC6 />} />
      <Route path="/anamc6" element={<ANAMC6 />} />
      <Route path="/permc6" element={<PERMC6 />} />
      
      {/* MC7 Routes */}
      <Route path="/intmc7" element={<INTMC7 />} />
      <Route path="/dbmc7" element={<DBMC7 />} />
      <Route path="/dpmc7" element={<DPMC7 />} />
      <Route path="/mapmc7" element={<MAPMC7 />} />
      <Route path="/anamc7" element={<ANAMC7 />} />
      <Route path="/permc7" element={<PERMC7 />} />
      
      {/* MC8 Routes */}
      <Route path="/intmc8" element={<INTMC8 />} />
      <Route path="/dbmc8" element={<DBMC8 />} />
      <Route path="/dpmc8" element={<DPMC8 />} />
      <Route path="/mapmc8" element={<MAPMC8 />} />
      <Route path="/anamc8" element={<ANAMC8 />} />
      <Route path="/permc8" element={<PERMC8 />} />
      
      {/* MC9 Routes */}
      <Route path="/intmc9" element={<INTMC9 />} />
      <Route path="/dbmc9" element={<DBMC9 />} />
      <Route path="/dpmc9" element={<DPMC9 />} />
      <Route path="/mapmc9" element={<MAPMC9 />} />
      <Route path="/anamc9" element={<ANAMC9 />} />
      <Route path="/permc9" element={<PERMC9 />} />
      
      {/* MC10 Routes */}
      <Route path="/intmc10" element={<INTMC10 />} />
      <Route path="/dbmc10" element={<DBMC10 />} />
      <Route path="/dpmc10" element={<DPMC10 />} />
      <Route path="/mapmc10" element={<MAPMC10 />} />
      <Route path="/anamc10" element={<ANAMC10 />} />
      <Route path="/permc10" element={<PERMC10 />} />
      
      {/* MC11 Routes */}
      <Route path="/intmc11" element={<INTMC11 />} />
      <Route path="/dbmc11" element={<DBMC11 />} />
      <Route path="/dpmc11" element={<DPMC11 />} />
      <Route path="/mapmc11" element={<MAPMC11 />} />
      <Route path="/anamc11" element={<ANAMC11 />} />
      <Route path="/permc11" element={<PERMC11 />} />
      
      {/* MC12 Routes */}
      <Route path="/intmc12" element={<INTMC12 />} />
      <Route path="/dbmc12" element={<DBMC12 />} />
      <Route path="/dpmc12" element={<DPMC12 />} />
      <Route path="/mapmc12" element={<MAPMC12 />} />
      <Route path="/anamc12" element={<ANAMC12 />} />
      <Route path="/permc12" element={<PERMC12 />} />
      
      {/* MC13 Routes */}
      <Route path="/intmc13" element={<INTMC13 />} />
      <Route path="/dbmc13" element={<DBMC13 />} />
      <Route path="/dpmc13" element={<DPMC13 />} />
      <Route path="/mapmc13" element={<MAPMC13 />} />
      <Route path="/anamc13" element={<ANAMC13 />} />
      <Route path="/permc13" element={<PERMC13 />} />
      
      {/* MC14 Routes */}
      <Route path="/intmc14" element={<INTMC14 />} />
      <Route path="/dbmc14" element={<DBMC14 />} />
      <Route path="/dpmc14" element={<DPMC14 />} />
      <Route path="/mapmc14" element={<MAPMC14 />} />
      <Route path="/anamc14" element={<ANAMC14 />} />
      <Route path="/permc14" element={<PERMC14 />} />
      
      {/* MC15 Routes */}
      <Route path="/intmc15" element={<INTMC15 />} />
      <Route path="/dbmc15" element={<DBMC15 />} />
      <Route path="/dpmc15" element={<DPMC15 />} />
      <Route path="/mapmc15" element={<MAPMC15 />} />
      <Route path="/anamc15" element={<ANAMC15 />} />
      <Route path="/permc15" element={<PERMC15 />} />
      
      {/* MC16 Routes */}
      <Route path="/intmc16" element={<INTMC16 />} />
      <Route path="/dbmc16" element={<DBMC16 />} />
      <Route path="/dpmc16" element={<DPMC16 />} />
      <Route path="/mapmc16" element={<MAPMC16 />} />
      <Route path="/anamc16" element={<ANAMC16 />} />
      <Route path="/permc16" element={<PERMC16 />} />
      
      {/* MC17 Routes */}
      <Route path="/intmc17" element={<INTMC17 />} />
      <Route path="/dbmc17" element={<DBMC17 />} />
      <Route path="/dpmc17" element={<DPMC17 />} />
      <Route path="/mapmc17" element={<MAPMC17 />} />
      <Route path="/anamc17" element={<ANAMC17 />} />
      <Route path="/permc17" element={<PERMC17 />} />
      
      {/* MC18 Routes */}
      <Route path="/intmc18" element={<INTMC18 />} />
      <Route path="/dbmc18" element={<DBMC18 />} />
      <Route path="/dpmc18" element={<DPMC18 />} />
      <Route path="/mapmc18" element={<MAPMC18 />} />
      <Route path="/anamc18" element={<ANAMC18 />} />
      <Route path="/permc18" element={<PERMC18 />} />
      
      {/* MC19 Routes */}
      <Route path="/intmc19" element={<INTMC19 />} />
      <Route path="/dbmc19" element={<DBMC19 />} />
      <Route path="/dpmc19" element={<DPMC19 />} />
      <Route path="/mapmc19" element={<MAPMC19 />} />
      <Route path="/anamc19" element={<ANAMC19 />} />
      <Route path="/permc19" element={<PERMC19 />} />
      
      {/* MC20 Routes */}
      <Route path="/intmc20" element={<INTMC20 />} />
      <Route path="/dbmc20" element={<DBMC20 />} />
      <Route path="/dpmc20" element={<DPMC20 />} />
      <Route path="/mapmc20" element={<MAPMC20 />} />
      <Route path="/anamc20" element={<ANAMC20 />} />
      <Route path="/permc20" element={<PERMC20 />} />
      
      {/* MC21 Routes */}
      <Route path="/intmc21" element={<INTMC21 />} />
      <Route path="/dbmc21" element={<DBMC21 />} />
      <Route path="/dpmc21" element={<DPMC21 />} />
      <Route path="/mapmc21" element={<MAPMC21 />} />
      <Route path="/anamc21" element={<ANAMC21 />} />
      <Route path="/permc21" element={<PERMC21 />} />
      
      {/* MC22 Routes */}
      <Route path="/intmc22" element={<INTMC22 />} />
      <Route path="/dbmc22" element={<DBMC22 />} />
      <Route path="/dpmc22" element={<DPMC22 />} />
      <Route path="/mapmc22" element={<MAPMC22 />} />
      <Route path="/anamc22" element={<ANAMC22 />} />
      <Route path="/permc22" element={<PERMC22 />} />
      
      {/* MC23 Routes */}
      <Route path="/intmc23" element={<INTMC23 />} />
      <Route path="/dbmc23" element={<DBMC23 />} />
      <Route path="/dpmc23" element={<DPMC23 />} />
      <Route path="/mapmc23" element={<MAPMC23 />} />
      <Route path="/anamc23" element={<ANAMC23 />} />
      <Route path="/permc23" element={<PERMC23 />} />
      
      {/* MC24 Routes */}
      <Route path="/intmc24" element={<INTMC24 />} />
      <Route path="/dbmc24" element={<DBMC24 />} />
      <Route path="/dpmc24" element={<DPMC24 />} />
      <Route path="/mapmc24" element={<MAPMC24 />} />
      <Route path="/anamc24" element={<ANAMC24 />} />
      <Route path="/permc24" element={<PERMC24 />} />
      
      {/* MC25 Routes */}
      <Route path="/intmc25" element={<INTMC25 />} />
      <Route path="/dbmc25" element={<DBMC25 />} />
      <Route path="/dpmc25" element={<DPMC25 />} />
      <Route path="/mapmc25" element={<MAPMC25 />} />
      <Route path="/anamc25" element={<ANAMC25 />} />
      <Route path="/permc25" element={<PERMC25 />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
