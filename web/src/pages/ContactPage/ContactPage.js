import { MetaTags } from '@redwoodjs/web'
import ContactForm from 'src/components/FeedbackAndHelp/ContactForm/ContactForm'

const ContactPage = () => {
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <ContactForm />

    </>
  )
}

export default ContactPage
