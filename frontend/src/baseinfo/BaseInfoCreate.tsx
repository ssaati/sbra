// BaseInfos.js
import * as React from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    required, Button, Link, useListContext, TopToolbar,
} from 'react-admin';
import {useSearchParams} from 'react-router-dom';
import {Add} from "@mui/icons-material";
import {Breadcrumbs} from "@mui/material";

const stopPropagation = e => e.stopPropagation();

interface BaseInfoBreadcrumbsProps {
    filter?: any
}

const BaseInfoBreadcrumbs = ({filter}: BaseInfoBreadcrumbsProps) => {

    return (
        <TopToolbar style={{width: '100%'}}>
            <Breadcrumbs style={{position: "absolute", right: "10px"}}>
                {filter.categoryId && (
                    <Link to={`/category/${filter.categoryId}`}>
                        {filter.categoryName}
                    </Link>
                )}
                {filter.parentId && (
                    <Link to={`/baseinfo/${filter.parentId}`}>
                        {filter.parentName}
                    </Link>
                )}
            </Breadcrumbs>
        </TopToolbar>
    );
};

const BaseInfoCreate = (props) => {

    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get('filter');
    const decodedFilter = filterParam ? JSON.parse(decodeURIComponent(filterParam)) : {};

    const categoryId = decodedFilter.categoryId;
    const categoryName = decodedFilter.categoryName;
    const parentId = decodedFilter.parentId;
    const parentName = decodedFilter.parentName;

    return (
        <Create {...props}
                actions={<BaseInfoBreadcrumbs filter={decodedFilter}/>}
                redirect={"list"}
        >
            <SimpleForm
                defaultValues={{
                    categoryId: categoryId,
                    parentId: parentId
                }}

            >

                {/*{!categoryId && (*/}
                <ReferenceInput source="categoryId" reference="category" label={"نام لیست"}>
                    <SelectInput optionText="name" validate={[required()]} label={"نام لیست"}/>
                </ReferenceInput>
                {/*)}*/}

                {/*{!parentId && (*/}
                <ReferenceInput
                    source="parentId"
                    reference="baseinfo"
                    filter={{categoryId}}
                    label={"سطح بالاتر"}
                >
                    <SelectInput optionText="name" label={"سطح بالاتر"}/>
                </ReferenceInput>
                {/*)}*/}
                <TextInput source="name" validate={[required()]} fullWidth label={"نام"}/>
                {/*<TextInput source="title" fullWidth  label={"عنوان"}/>*/}
            </SimpleForm>
        </Create>
    );
};
export default BaseInfoCreate;
