import "./index.scss";

interface ErrorFieldProps {
  error: string | undefined;
  touched: boolean | undefined;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ error, touched }) => {
  return (
    <div>
      {error && touched  && (
        <div className="error-field">
          <i className="far fa-times-circle"></i> {error}
        </div>
      )}
    </div>
  );
}

export default ErrorField;
