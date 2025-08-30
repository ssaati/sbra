import React from "react";
import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    required,
    Datagrid,
    TextField,
    List,
    EditButton,
    TopToolbar,
    CreateButton,
    Link,
    useRecordContext,
    DataTable,
    Button,
    ArrayField, SimpleFormIterator, ArrayInput
} from 'react-admin';

import ListIcon from "@mui/icons-material/List";
import {Card, CardContent, CardHeader} from "@mui/material";

const stopPropagation = e => e.stopPropagation();

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} label={"نام"} fullWidth />
            <ArrayInput source="children" label={"زیر گروه ها"}>
                <SimpleFormIterator>
                    <TextInput source="" label={"نام"}/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth  label={"نام"}/>

            <Card variant="outlined" sx={{width:'100%'}} >
                <CardHeader
                    title="زیرگروه ها"
                    // avatar={<ExpandMoreIcon />}
                    sx={{
                        bgcolor: 'grey.100',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '& .MuiTypography-root': {
                            fontSize: '15px',

                        }
                    }}
                />
                <CardContent>
                    <ArrayInput source="children" label={""}>
                        <SimpleFormIterator>
                            <TextInput source="" label={"نام"}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </CardContent>
            </Card>

        </SimpleForm>
    </Edit>
);

export const CategoryList = (props) => (
    <List {...props} actions={<ListActions />}>
        <DataTable
            rowClick="edit"
            // expand={PostPanel}
            hiddenColumns={['average_note']}
            sx={{
                '& .hiddenOnSmallScreens': {
                    display: {
                        xs: 'none',
                        lg: 'table-cell',
                    },
                },
            }}
        >
            <DataTable.Col
                source="name"
                sx={{
                    // maxWidth: '16em',
                    '&.MuiTableCell-body': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                }}
                label={"نام لیست"}
            />
            <DataTable.Col sx={{ textAlign: 'center', width:"150px" }}>
                <EditButton/>
            </DataTable.Col>
            <DataTable.Col sx={{ textAlign: 'center', width:"150px" }}>
                <BaseInfoLinkField label="لیست اقلام" />
            </DataTable.Col>
        </DataTable>
    </List>
);

const ListActions = ({ ...props }) => (
    <TopToolbar {...props}>
        <CreateButton />
    </TopToolbar>
);

const BaseInfoLinkField = () => {
    const record = useRecordContext();
    let linkTitle = <>لیست اقلام</>;
    if(record?.children && record?.children.length > 0)
        linkTitle = <>لیست {record?.children[0]} </>;
    return (
        <Button component={Link} to={`/baseinfo?filter=${JSON.stringify({categoryId: record?.id, categoryName: record?.name})}`} onClick={stopPropagation}>
            <ListIcon/>
            {linkTitle}
        </Button>
    );
}
