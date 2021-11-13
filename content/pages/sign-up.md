---
title: Sign Up
sections:
  - type: HeroSection
    title: All about the art of selling fish
    subtitle: Fresh. Better. Faster
    text: >-
      Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.
      Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet
      erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat
      vitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.
    feature:
      type: ImageBlock
      url: /images/hero-image.png
      altText: Hero section image
    backgroundImage:
      altText: ''
      url: ''
      caption: ''
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        alignItems: center
        justifyContent: center
        flexDirection: row-reverse
      title:
        fontWeight: 700
        fontStyle: normal
        textAlign: left
        margin:
          - mt-0
          - mb-0
      subtitle:
        fontWeight: 400
        fontStyle: normal
        textAlign: left
        margin:
          - mt-8
          - mb-8
      text:
        textAlign: left
      actions:
        justifyContent: flex-start
  - elementId: contact-form
    colors: colors-a
    title: Contact us
    text: We look forward to hearing from you.
    form:
      type: FormBlock
      elementId: contact-form
      action: /.netlify/functions/submission_created
      destination: ''
      fields:
        - type: TextFormControl
          name: name
          label: Name
          placeholder: Your name
          isRequired: true
          width: 1/2
        - type: EmailFormControl
          name: email
          label: Email
          placeholder: Your email
          isRequired: true
          width: 1/2
        - type: TextFormControl
          name: home-address
          label: Home address
          placeholder: Your home address
          isRequired: true
          width: full
        - type: CheckboxFormControl
          name: updates
          label: Sign me up to receive updates
          width: full
      submitLabel: Send Message
    feature:
      type: ImageBlock
      url: /images/trout.png
      altText: Contact us
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-12
          - pb-12
          - pl-4
          - pr-4
        alignItems: center
        justifyContent: center
        flexDirection: row-reverse
      title:
        fontWeight: 700
        fontStyle: normal
        textAlign: left
      text:
        textAlign: left
    action: /.netlify/functions/submission_created
    type: ContactSection
layout: PageLayout
_slug: oval-maple-439
---
