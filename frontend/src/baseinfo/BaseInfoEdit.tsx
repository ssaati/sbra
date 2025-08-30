import {
    Button,
    Edit,
    Link,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput, TopToolbar,
    useListContext
} from "react-admin";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import {useFormContext} from "react-hook-form";
import {Add} from "@mui/icons-material";
import {Breadcrumbs} from "@mui/material";

const stopPropagation = e => e.stopPropagation();

const BaseInfoBreadcrumbs = () => {

    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get('filter');
    const decodedFilter = filterParam ? JSON.parse(decodeURIComponent(filterParam)) : {};

    const categoryId = decodedFilter.categoryId;
    const categoryName = decodedFilter.categoryName;
    const parentId = decodedFilter.parentId;
    const parentName = decodedFilter.parentName;

    return (
        <TopToolbar style={{width:'100%'}}>
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

function getCategoryId() {
    let useFormContext1 = useFormContext();
    if(useFormContext1) {
        const { watch } = useFormContext1;
        const categoryId = watch("categoryId");
    }
}

function ParentInput() {
    let useFormContext1 = useFormContext();
    const { watch } = useFormContext1;
    let categoryId = watch("categoryId");
    return <ReferenceInput source="parentId" reference="baseinfo"
                           filter={
                               {categoryId: categoryId}}
                           label={"سطح بالاتر"}>
        <SelectInput optionText="name"  label={"سطح بالاتر"}/>
    </ReferenceInput>;
}

const BaseInfoEdit = (props) => {

    return(
    <Edit {...props}
          actions={<BaseInfoBreadcrumbs />}
          redirect={"list"}
    >
        <SimpleForm>
            <ReferenceInput source="categoryId" reference="category" label={"نام لیست"}>
                <SelectInput optionText="name" validate={[required()]} label={"نام لیست"}/>
            </ReferenceInput>
            <ParentInput/>
            <TextInput source="name" validate={[required()]} fullWidth label={"نام"}/>
            {/*<TextInput source="title" fullWidth label={"عنوان"}/>*/}
        </SimpleForm>
    </Edit>
)};

export default BaseInfoEdit;