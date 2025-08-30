import {
    Button,
    CreateButton,
    Datagrid,
    EditButton,
    FunctionField,
    List,
    Pagination,
    ReferenceField,
    TextField, TopToolbar,
    useListContext, useRecordContext
} from "react-admin";
import { Link } from 'react-router-dom';

import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import {Breadcrumbs} from "@mui/material";
import {Add} from "@mui/icons-material";
import dataProvider from "../providers/dataProvider";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const stopPropagation = e => e.stopPropagation();

const BaseInfoBreadcrumbs = () => {
    const { filterValues } = useListContext();
    const { categoryId, parentId, categoryName, parentName } = filterValues || {};
    return (
        <TopToolbar style={{width:'100%'}}>
            <CustomCreateButton filter={filterValues} />
            <Breadcrumbs style={{position:"absolute", right:"10px"}}>
                {categoryId && (
                    <Link to={`/category/${categoryId}`}>
                        {categoryName}
                    </Link>
                )}
                {parentId && (
                    <Link to={`/baseinfo/${parentId}`}>
                         {parentName}
                    </Link>
                )}
            </Breadcrumbs>
        </TopToolbar>
    );
};

const BaseInfoList = (props) => {
    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get('filter');
    const decodedFilter = filterParam ? JSON.parse(decodeURIComponent(filterParam)) : {};

    const categoryId = decodedFilter.categoryId;
    const categoryName = decodedFilter.categoryName;
    const parentId = decodedFilter.parentId;
    const parentName = decodedFilter.parentName;

    const [category, setCategory] = useState()
    const [parent, setParent] = useState<{id:string; level:string; name:string}>()

    useEffect(() => {
        if(parentId) {
            dataProvider.getOne("baseinfo", {id: parentId}).then((data) => {
                setParent(data.data);
            })
        }

    }, [parentId]);

    if(categoryId) {
        dataProvider.getOne("category", {id:categoryId}).then((data) => {
            setCategory(data.data);
        });
    }

    function getParentLevel():string {
        if(parent){
            console.log(parent);
            return parent.level;
        }
        return "قلم بالاتر"
    }

    return (
        <List
            {...props}
            actions={<BaseInfoBreadcrumbs />}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50]} />}
        >
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name"  label={"نام"}/>
                {/*<TextField source="title"  label={"عنوان"}/>*/}
                {/*<ReferenceField source="categoryId" reference="category" label={"نام لیست"}>*/}
                {/*    <TextField source="name" />*/}
                {/*</ReferenceField>*/}
                <ReferenceField source="parentId" reference="baseinfo" label={getParentLevel()}>
                    <TextField source="name" />
                </ReferenceField>
                <Children/>
                {/*<AddChildren/>*/}
                <EditButton />
            </Datagrid>
        </List>
    );
};
const Children = () => {
    const record = useRecordContext();
    let linkTitle = <>لیست زیرمجموعه</>;
    if(record?.childrenLevel)
        linkTitle = <>لیست  {record?.childrenLevel}</>;
    return (
        <Link to={`/baseinfo?filter=${JSON.stringify({
            categoryId: record?.categoryId,
            categoryName: record?.categoryName,
            parentId: record?.id,
            parentName: record?.name
        })}`} onClick={stopPropagation}>
            {linkTitle}
        </Link>
    );
}
const AddChildren = () => {
    const record = useRecordContext();
    return (
        <CreateButton
            resource="baseinfo"
            state={{
                categoryId: record?.category?.id,
                categoryName: record?.category?.name,
                parentId: record?.id,
                parentName: record?.name
            }}
            label="اضافه کردن زیرمجموعه"
            onClick={stopPropagation}/>
    );
}
const CustomCreateButton3 = (props) => {
    return (
        <Link
            to={{
                pathname: 'create',
            }}
            state={{
                categoryId: props.categoryId,
                categoryName : props.categoryName,
                parentId: props.parentId,
                parentName : props.parentName
            }}>
            اضافه کردن زیرمجموعه
        </Link>
    );
}
const CustomCreateButton = (props) => {
    const encodedFilter = encodeURIComponent(JSON.stringify(props.filter));
    return (
        <Button component={Link}
                // to={`/baseinfo/create?categoryId=${categoryId}&categoryName=${categoryName}&parentId=${parentId}&parentName=${parentName}`}
                to={`/baseinfo/create?filter=${encodedFilter}`}
                onClick={stopPropagation}>
            <Add/>
            ایجاد
        </Button>
    );
}

const BaseInfoActions = ({ data }) => {
    const record = data || {};
    return (
        <>

        </>
    );
};
export default BaseInfoList;