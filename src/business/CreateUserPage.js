import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { ControlledTextField, ZipCodeTextField } from "../components/inputs";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getCEP } from "../api/cep";
import { ArrowBack } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    name: "",
    birthDate: "",
    zipcode: "",
    city: "",
    state: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };

  const handleZipcodeChange = (e) => {
    formProps.setValue("zipcode", e.target.value);
  };

  const handleCEPSearch = async () => {
    await getCEP(formProps.getValues("zipcode")).then((res) => {
      if (res?.data) {
        formProps.setValue("city", res.data.localidade);
        formProps.setValue("state", res.data.uf);
      }
    });
  };
  const handleSubmit = () => {
    dispatch(actions.createUser.request(formProps.getValues()));
  };

  useEffect(() => {
    formProps.reset(initialValues);
  }, [data]);

  if (loading) {
    return <div>Carregando</div>;
  }

  return (
    <>
      <Box flexDirection="row" display="flex">
        <IconButton>
          <ArrowBack
            onClick={() => dispatch(routeActions.redirectTo(routes.HOME))}
          />
        </IconButton>
        <Typography variant="h4">Criar usuário</Typography>
      </Box>
      <Paper style={{ width: "fit-content", padding: 20 }}>
        <form
          onSubmit={formProps.handleSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <ControlledTextField
            label="Nome"
            name={"name"}
            formProps={formProps}
          />
          <DatePicker
            label="Data de Nascimento"
            name={"birthDate"}
            defaultValue={new Date(initialValues.birthDate)}
            onChange={(e) => formProps.setValue("birthDate", e)}
          />
          <ZipCodeTextField
            name={"zipcode"}
            label="CEP"
            onChange={handleZipcodeChange}
            onBlur={handleCEPSearch}
            customInput={TextField}
            defaultValue={initialValues.zipcode}
          />

          <ControlledTextField
            label="Cidade"
            name={"city"}
            formProps={formProps}
            InputLabelProps={{ shrink: true }}
          />
          <ControlledTextField
            label="UF"
            name={"state"}
            formProps={formProps}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Criar
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default CreateUserPage;
