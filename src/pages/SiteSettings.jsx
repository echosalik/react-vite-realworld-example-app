// import classNames from 'classnames'
import React from 'react'
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useQueryClient } from 'react-query';

import { useAuth, useSiteSettingsQuery } from '../hooks'
import { FormErrors, TagsInput } from '../components';

function SiteSettings() {
  const { isAuth } = useAuth()
  const settingsQuery = useSiteSettingsQuery();
  const queryClient = useQueryClient();
  const settings = (settingsQuery?.data?.settings || []).reduce( (prev, curr, _i, _a) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});

  React.useEffect(() => {
    // setFilters({ ...initialFilters, feed: isAuth });
  }, [isAuth])

  async function onSubmit(values, { setErrors }) {
    try {
      
      const { data } = await axios.post(`/site-settings`, { ...values })
      console.log(data);

      // navigate(`/article/${data?.article?.slug}`)
    } catch (error) {
      // const { status, data } = error.response

      // if (status === 422) {
        // setErrors(data.errors)
      // }
    }
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Formik
              onSubmit={onSubmit}
              initialValues={settings}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <>
                  <FormErrors />
                  <Form>
                    <fieldset disabled={isSubmitting}>
                      <fieldset className="form-group">
                        <label className="label" htmlFor="brand-primary">Primary Color</label>
                        <Field
                          name="brand-primary"
                          type="color"
                          className="form-control"
                          placeholder="Primary Color"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <label className="label" htmlFor="brand-danger">Danger Color</label>
                        <Field
                          name="brand-danger"
                          type="color"
                          className="form-control"
                          placeholder="Danger Color"
                          helper="Danger Color"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <label className="label" htmlFor="font-family-sans-serif">Font Family</label>
                        <Field
                          name="font-family-sans-serif"
                          type="text"
                          className="form-control"
                          helper="Font Family"
                        />
                      </fieldset>
                      <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                        Save Changes
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteSettings
