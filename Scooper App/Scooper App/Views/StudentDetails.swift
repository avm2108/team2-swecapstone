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
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        VStack {
            HStack {
                Text("Add Student")
                    .font(.largeTitle.bold())
                    .foregroundStyle(.black)
                .padding()
                
                Spacer()
                
                Button {
                    isPresented = true
                } label: {
                    Image(systemName: "plus.circle.fill")
                        .resizable()
                        .frame(width: 40, height: 40)
                        .foregroundStyle(.blue)
                        .padding()
                }
            }
            .popover(isPresented: $isPresented, content: {
                VStack {
                    Text("Add Guardian")
                        .font(.largeTitle.bold())
                        .foregroundStyle(.black)
                    
                    TextField("First Name", text: $fname)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Last Name", text: $lname)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Phone Number", text: $phone)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("Email", text: $email)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    TextField("relation", text: $relation)
                        .padding()
                        .border(.black)
                        .background(.white)
                    
                    if (studentID == "") {
                        TextField("Student ID", text: $studentID)
                            .padding()
                            .border(.black)
                            .background(.white)
                    }
                    
                    Spacer()
                    
                    Button {
                        isPresented = false
//                        vm.updateStudent(id: self.studentID, email: self.email, name: self.fname + " " + self.lname, phone: self.phone, relation: self.relation)
                        reset()
                        self.dismiss.callAsFunction()
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
                .padding()
            })
            
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
                    
                    TextField("Grade", text: $grade)
                        .padding()
                        .border(.black)
                        .background(.white)
                }
                .padding()
            }

            Button {
                Task {
                    do {
//                        try await vm.addStudent(student: Student(id: self.studentID, name: self.studentFname + " " + self.studentLname, birth: self.birth, address: Address(id: "", address: self.address, city: self.city, state: self.state, zipCode: self.zipCode, type: self.type), scooper: self.fname + " " + self.lname, status: true, position: 0, grade: self.grade))
                    } catch {
                        print("Error adding student")
                    }
                }
                
                isPresented = true
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
        .onAppear {
            let dateFormatter = DateFormatter()
            dateFormatter.dateStyle = .short
            self.birth = dateFormatter.string(from: birthdate)
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

#Preview {
    StudentDetails()
}
