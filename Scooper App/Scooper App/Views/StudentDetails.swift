//
//  StudentDetails.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI


struct StudentDetails: View {
    @State private var studentFname = ""
    @State private var studentLname = ""
    @State private var birth = ""
    @State private var grade = ""
    @State private var address = ""
    @State private var type = ""
    @State private var city = ""
    @State private var state = ""
    @State private var zipCode = ""
    @State private var birthdate = Date()
    @State private var isPresented = false
    @State private var fname = ""
    @State private var lname = ""
    @State private var phone = ""
    @State private var email = ""
    @State private var relation = ""
    @State private var studentID = ""
    @State private var vehicleColor = ""
    @State private var vehicleYear = ""
    @State private var vehicleModel = ""
    @State private var vehicleMake = ""
    @State private var licensePlate = ""
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @Environment(\.dismiss) var dismiss
    
    var isFilled: Bool {
        studentFname.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        studentLname.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        studentID.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        address.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        city.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        state.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        zipCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        grade.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
    var isFilledParent: Bool {
        fname.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        lname.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        phone.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        email.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        relation.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        zipCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        vehicleColor.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        vehicleYear.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        vehicleModel.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        vehicleMake.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
        licensePlate.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
    @State private var showAlert = false
    @State private var showAlert2 = false
    
    var body: some View {
        VStack {
            HStack {
                Text("Student")
                    .font(.largeTitle.bold())
                    .foregroundStyle(Color("scooperYellow"))
                    .padding()
                
                Spacer()
                
                Button {
                    isPresented = true
                } label: {
                    Image(systemName: "person.crop.circle.badge.plus")
                        .resizable()
                        .frame(width: 50, height: 40)
                        .foregroundStyle(.blue)
                        .padding()
                }
            }
            .fullScreenCover(isPresented: $isPresented, content: {
                VStack {
                    ScrollView(.vertical) {
                        Text("Add Guardian")
                            .font(.largeTitle.bold())
                            .foregroundStyle(.black)
                        
                        TextField("First Name", text: $fname)
                            .padding()
                            .border(.black)
                            .background(.white)
                            .keyboardType(.alphabet)
                        
                        TextField("Last Name", text: $lname)
                            .padding()
                            .border(.black)
                            .background(.white)
                        
                        TextField("Phone Number", text: $phone)
                            .padding()
                            .border(.black)
                            .background(.white)
                            .keyboardType(.numberPad)
                        
                        TextField("Email", text: $email)
                            .textCase(.lowercase)
                            .textInputAutocapitalization(.never)
                            .padding()
                            .border(.black)
                            .background(.white)
                        
                        TextField("Relation", text: $relation)
                            .padding()
                            .border(.black)
                            .background(.white)
                        
                        Section {
                            TextField("Color", text: $vehicleColor)
                                .padding()
                                .border(.black)
                                .background(.white)
                            
                            TextField("Make", text: $vehicleMake)
                                .padding()
                                .border(.black)
                                .background(.white)
                            
                            TextField("Model", text: $vehicleModel)
                                .padding()
                                .border(.black)
                                .background(.white)
                            
                            TextField("Year", text: $vehicleYear)
                                .padding()
                                .border(.black)
                                .background(.white)
                                .keyboardType(.numberPad)
                            
                            TextField("License Plate", text: $licensePlate)
                                .padding()
                                .border(.black)
                                .background(.white)
                        } header: {
                            Text("Car Information")
                                .font(.largeTitle.bold())
                                .foregroundStyle(.black)
                        }
                    }
                    .padding()
                    .alert("Empty Fields", isPresented: $showAlert2, actions: {
                        Button("OK") {
                            showAlert2 = false
                        }
                    }, message: {
                        Text("Must filled in all inforamtion.")
                    })
                    

                    
                    Spacer()
                    
                    Button {
                        if isFilledParent {
                            showAlert2 = true
                        } else {
                            vm.updateStudent(id: studentID, parent: Parent(email: email, name: fname + " " + lname, phone: phone, relation: relation, vehicle: Vehicle(color: vehicleColor, year: vehicleYear, model: vehicleModel, make: vehicleMake, licensePlate: licensePlate)))
                            isPresented = false
                            reset()
                            self.dismiss.callAsFunction()
                        }
                    } label: {
                        Text("Submit")
                    }
                    .font(.headline)
                    .frame(height: 55)
                    .frame(minWidth: 360)
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .clipShape(Rectangle())
                    .cornerRadius(10)
                    .padding()
                }
            })
            .background(Color("scooperGreen"))
            
            Spacer()
            
            ScrollView(.vertical) {
                VStack(spacing: 20) {
                    TextField("First Name", text: $studentFname)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Last Name", text: $studentLname)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    ZStack(alignment: .trailing) {
                        TextField("Student ID\(studentID)", text: $studentID)
                            .padding()
                            .border(.black)
                            .background(.white)
                            .keyboardType(.numberPad)
                            
                        
                        Button {
                            generateUniqueID()
                        } label: {
                            Text("Generate ID")
                        }
                        .padding()
                        .font(.system(size: 10))
                        .frame(width: 90, height: 40)
                        .foregroundStyle(.white)
                        .background(.black.opacity(0.8))
                        .clipShape(RoundedRectangle(cornerSize: CGSize(width: 10, height: 10)))
                        .padding(.trailing)
                    }
                    
                    DatePicker(selection: $birthdate, displayedComponents: [.date], label: { Text("Date of Birth") })
                        .datePickerStyle(.compact)
                    
                    TextField("Address", text: $address)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Apartment, suite, etc.", text: $type)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("City", text: $city)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("State/province", text: $state)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Zip Code", text: $zipCode)
                        .padding()
                        .border(.black)
                        .background(.white)
                        .keyboardType(.numberPad)
                    
                    TextField("Grade", text: $grade)
                        .padding()
                        .border(.black)
                        .background(.white)
                        .keyboardType(.numberPad)
                }
                .padding()
            }
            .alert("Empty Fields", isPresented: $showAlert, actions: {
                Button("OK") {
                    showAlert = false
                }
            }, message: {
                Text("Must filled in all inforamtion.")
            })
            
            Button {
                if isFilled {
                    showAlert = true
                } else {
                    let dateFomatter = DateFormatter()
                    dateFomatter.dateStyle = .short
                    self.birth = dateFomatter.string(from: birthdate)
                    vm.addStudent(student: Student(id: studentID, name: studentFname + " " + studentLname, birth: birth, address: Address(address: address, city: city, state: state, zipCode: zipCode, type: type), scooper: fname + " " + lname, status: true, position: 0, grade: grade, guardian: Parent(email: email, name: fname + " " + lname, phone: phone, relation: relation, vehicle: Vehicle(color: vehicleColor, year: vehicleYear, model: vehicleModel, make: vehicleMake, licensePlate: licensePlate))))
                    isPresented = true
                }
            } label: {
                Text("Add")
            }
            .font(.headline)
            .frame(height: 55)
            .frame(minWidth: 360)
            .foregroundColor(.white)
            .background(Color.blue)
            .clipShape(Rectangle())
            .cornerRadius(10)
            .padding()

        }
        .frame(maxWidth: .infinity)
        .background(Color.gray.opacity(0.2))
    }
    
    func generateUniqueID() {
        let id = UUID().uuidString
        self.studentID = id.trimmingCharacters(in: .alphanumerics)
    }
    
    func reset() {
        self.studentFname = ""
        self.studentLname = ""
        self.birth = ""
        self.grade = ""
        self.address = ""
        self.type = ""
        self.city = ""
        self.state = ""
        self.zipCode = ""
        self.fname = ""
        self.lname = ""
        self.phone = ""
        self.email = ""
        self.relation = ""
        self.studentID = ""
    }
}

extension String {
    func applyPatternOnNumbers(pattern: String, replacementCharacter: Character) -> String {
        var pureNumber = self.replacingOccurrences( of: "[^0-9]", with: "", options: .regularExpression)
        for index in 0 ..< pattern.count {
            guard index < pureNumber.count else { return pureNumber }
            let stringIndex = String.Index(utf16Offset: index, in: pattern)
            let patternCharacter = pattern[stringIndex]
            guard patternCharacter != replacementCharacter else { continue }
            pureNumber.insert(patternCharacter, at: stringIndex)
        }
        return pureNumber
    }
}

#Preview {
    StudentDetails()
}
