---
title: "Use Reflection to compare Class properties with Enum element names"
date: "2007-03-06"
summary: "The following code demonstrates how to use Reflection to simply your code; making it easier to read and understand, and remove code for potential bugs. The \"normal\" way of assigning/comparing Enum elements with class properties. In this…"
topics: [".Net","C#","Development"]
originalUrl: "https://elegantdevelopment.blogspot.com/2007/03/use-reflection-to-compare-class.html"
bloggerId: "tag:blogger.com,1999:blog-17855063.post-5437270979488306060"
---

  
The following code demonstrates how to use Reflection to simply your code; making it easier to read and understand, and remove code for potential bugs.  
  
The "normal" way of assigning/comparing Enum elements with class properties. In this example, the code must be changed every time you change the user class or the DataField enum. That's a major pain in the neck!  

```csharp

public class User
{
     public string FirstName;
     public string LastName;
     public string EmailAddress;
     public User() { }
}

public enum DataField
{
     FirstName,
     LastName,
     EmailAddress,
}

string value = "";
switch (field.DataField)
{
     case DataField.FirstName: value = currentUser.FirstName;
         break;
     case DataField.LastName: value = currentUser.LastName;
         break;
     case DataField.EmailAddress: value = currentUser.EmailAddress;
         break;
     default: value = "";
         break;
}
```

  
Using the switch statement above, you'd have to modify it whenever you add more properties of your User class..  
  
But, by using the following code, you won't ever have to modify the switch statement because it isn't even needed anymore.  

```csharp

public class User
{
     public int PlanType;

    public string FirstName;
    public string LastName;
    public string EmailAddress;

    public string Address;
    public string City;
    public string State;
    public string PostalCode;
    public string Country;
    public string PhoneNumber;

    public string CreditCardName;
    public string CreditCardType;
    public string CreditCardNumber;
    public string CreditCardExpirationMonth;
    public string CreditCardExpirationYear;

    public User() { }
}

public enum DataField
{
    Unknown,
    PlanType,
    FirstName,
    LastName,
    EmailAddress,
    Address,
    City,
    State,
    PostalCode,
    Country,
    PhoneNumber,
    CreditCardName,
    CreditCardType,
    CreditCardNumber,
    CreditCardExpirationMonth,
    CreditCardExpirationYear
}

string value = "";
FieldInfo[] properties = currentUser.GetType().GetFields();
for (int i = 0; i < properties.Length; i++)
{
     if (properties[i].Name == field.DataField.ToString())
    {
         Object obj = properties[i].GetValue(currentUser);
        if (null != obj)

             value = (string)obj;
        break;
    }
}
```

  
Of course, you'll still have to ensure that the `DataField` enum and the `User` class properties are kept in sync, but you don't ever have to modify your `for` loop. That's cool!
