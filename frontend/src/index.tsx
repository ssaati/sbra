/* eslint react/jsx-key: off */
import * as React from 'react';
import {Admin, CustomRoutes, Resource} from 'react-admin';
import {createRoot} from 'react-dom/client';
import {Route} from 'react-router-dom';

import authProvider from './providers/authProvider';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './providers/dataProvider';
import Layout from './layout/Layout';
import users from './users';
import roles from './roles';
import {queryClient} from './queryClient';

import {StylesProvider} from '@mui/styles';

import {CssBaseline} from '@mui/material';
import CustomLoginPage from "./layout/CustomLoginForm";
import {CategoryCreate, CategoryEdit, CategoryList} from "./category/Categories"
import baseinfo from "./baseinfo"


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
	  <StylesProvider >
		<CssBaseline />
      <div dir="rtl" style={{ minHeight: '100vh' , fontFamily:'Yekan Bakh FaNum Regular'}}>
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            queryClient={queryClient}
            loginPage={CustomLoginPage}

            title="Jaryan"
            layout={Layout}
            // dashboard={()=><ShowForms/>}
        >
            <Resource name="users" {...users} options={{ label: 'کاربران'}}/>
            <Resource name="roles" {...roles}  options={{ label: 'گروه ها'}}/>
            <Resource name="category"   options={{ label: 'لیست آماده'}} list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />
            <Resource name="baseinfo" {...baseinfo}  options={{ label: 'اطلاعات لیست'}}/>

            <CustomRoutes noLayout>
                <Route
                    path="/custom"
                    element={<CustomRouteNoLayout title="Posts from /custom" />}
                />
                <Route
                    path="/custom1"
                    element={
                        <CustomRouteNoLayout title="Posts from /custom1" />
                    }
                />
            </CustomRoutes>
            <CustomRoutes>
                <Route
                    path="/custom3"
                    element={<CustomRouteLayout title="Posts from /custom3" />}
                />
            </CustomRoutes>
        </Admin>
		</div>
	  </StylesProvider>
    </React.StrictMode>
);
